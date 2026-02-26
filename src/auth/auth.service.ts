import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

import { User, UserDocument, UserRole } from '../user/entities/user.entity';
import { Company, CompanyDocument } from '../company/entities/company.entity';
import {
  UserRoleEntity,
  UserRoleDocument,
} from '../user-roles/entities/user-role.entity';
import {
  LoginAudit,
  LoginAuditDocument,
} from './entities/login-audit.entity';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class AuthService {
  private transporter;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,

    @InjectModel(UserRoleEntity.name)
    private readonly userRoleModel: Model<UserRoleDocument>,

    @InjectModel(LoginAudit.name)
    private readonly loginAuditModel: Model<LoginAuditDocument>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: Number(this.configService.get<string>('MAIL_PORT')),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  // ================= TOKEN =================
  // ================= TOKEN (PUBLIC) =================
  public async generateTokens(user: UserDocument) {
    let companyId = user.companyId ? user.companyId.toString() : null;

    // 🔥 SaaS Optimization: If user has no active companyId, pick the first one they own or are invited to
    if (!companyId) {
      // 1. Check ownership
      const ownedCompany = await this.companyModel.findOne({ userId: user._id });
      if (ownedCompany) {
        companyId = (ownedCompany._id as any).toString();
      } else {
        // 2. Check invitations (UserRoleEntity)
        const invitation = await this.userRoleModel.findOne({
          userEmail: user.email,
          invitationStatus: 'VERIFIED',
        });
        if (invitation) {
          companyId = invitation.companyId.toString();
        }
      }

      if (companyId) {
        // Update user record for future logins
        await this.userModel.findByIdAndUpdate(user._id, { companyId: new Types.ObjectId(companyId) });
      }
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      companyId: companyId,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '30d',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '90d',
      }),
    };
  }

  // ✅ New helper to refresh tokens for a user
  async refreshUserToken(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new CustomError(404, 'User not found');
    return this.generateTokens(user);
  }

  // ================= REGISTER =================
  async register(dto: RegisterDto) {
    try {
      if (dto.password !== dto.confirmPassword) {
        throw new CustomError(400, 'Passwords do not match');
      }

      const email = dto.email.toLowerCase();
      const exists = await this.userModel.findOne({ email });
      if (exists) throw new CustomError(400, 'Email already registered');

      const user = await this.userModel.create({
        name: dto.name,
        email,
        password: await bcrypt.hash(dto.password, 10),
        role: dto.role || UserRole.USER,
        isActive: true,
        isEmailVerified: false,
      });

      return new CustomResponse(201, 'Registered successfully', {
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ================= LOGIN =================
  async login(dto: LoginDto, req: any) {
    try {
      const user = await this.userModel.findOne({
        email: dto.email.toLowerCase(),
      });

      if (!user) {
        await this.loginAuditModel.create({
          email: dto.email,
          ip: req.socket.remoteAddress,
          userAgent: req.headers['user-agent'],
          status: 'FAILED',
          reason: 'User not found',
        });
        throw new CustomError(401, 'User not found');
      }

      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        await this.loginAuditModel.create({
          userId: user._id,
          email: user.email,
          role: user.role,
          ip: req.socket.remoteAddress,
          userAgent: req.headers['user-agent'],
          status: 'FAILED',
          reason: 'Wrong password',
        });
        throw new CustomError(401, 'Invalid password');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      await this.loginAuditModel.create({
        userId: user._id,
        email: user.email,
        role: user.role,
        ip: req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        status: 'SUCCESS',
      });

      return new CustomResponse(200, 'OTP sent to your email', {
        email: user.email,
        otp, // dev/testing only
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ================= VERIFY OTP =================
  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const user = await this.userModel.findOne({
        email: dto.email.toLowerCase(),
        otp: dto.otp.toString(),
      });

      if (!user) throw new CustomError(400, 'Invalid OTP');
      if (!user.otpExpires || user.otpExpires < new Date()) {
        throw new CustomError(400, 'OTP expired');
      }

      user.otp = undefined;
      user.otpExpires = undefined;
      user.isEmailVerified = true;
      await user.save();

      const tokens = await this.generateTokens(user);

      return new CustomResponse(200, 'Login successful', {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ================= LOGIN AUDITS (ADMIN ONLY) =================
  async getLoginAudits() {
    const logs = await this.loginAuditModel
      .find()
      .sort({ createdAt: -1 })
      .lean();

    return new CustomResponse(200, 'Login audit logs', logs);
  }

  // ================= FORGOT PASSWORD =================
  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new CustomError(400, 'User not found');

    const token = randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    return new CustomResponse(200, 'Reset link sent', null);
  }

  // ================= RESET PASSWORD =================
  async resetPassword(
    token: string,
    password: string,
    confirmPassword: string,
  ) {
    if (password !== confirmPassword) {
      throw new CustomError(400, 'Passwords do not match');
    }

    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) throw new CustomError(400, 'Invalid token');

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return new CustomResponse(200, 'Password reset successful', null);
  }
}
