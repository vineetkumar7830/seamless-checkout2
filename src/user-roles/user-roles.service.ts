import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { UserRoleEntity } from './entities/user-role.entity';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { VerifyInvitationOtpDto } from './dto/verify-invitation-otp.dto';
import { Company } from '../company/entities/company.entity';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class UserRoleService {
  private transporter;

  constructor(
    @InjectModel(UserRoleEntity.name)
    private userRoleModel: Model<UserRoleEntity>,
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  // ================= SEND / UPDATE INVITATION (SAAS SAFE) =================
  async sendInvitation(
    dto: SendInvitationDto,
    companyId: string,        // comes from JWT only
    loggedInEmail: string,    // comes from JWT
  ) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing from token.');
      }

      if (dto.userEmail !== dto.confirmUserEmail) {
        throw new CustomError(400, 'Email mismatch');
      }

      // ✅ Company validation (tenant isolation)
      const company = await this.companyModel.findById(
        new Types.ObjectId(companyId),
      );

      if (!company) {
        throw new CustomError(404, 'Company not found');
      }

      const normalizedEmail = dto.userEmail.trim().toLowerCase();

      // ✅ SaaS isolation mandatory
      const existing = await this.userRoleModel.findOne({
        companyId: new Types.ObjectId(companyId),
        userEmail: normalizedEmail,
      });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

      // ================= NEW USER =================
      if (!existing) {
        const invitation = await this.userRoleModel.create({
          companyId: new Types.ObjectId(companyId),
          fullLegalName: dto.fullLegalName,
          nickName: dto.nickName,
          userEmail: normalizedEmail,
          userType: dto.userType,
          invitationStatus: 'PENDING',
          otp,
          otpExpires,
        });

        await this.sendOtpMail(loggedInEmail, dto, otp);

        return new CustomResponse(201, 'OTP sent for approval', {
          invitationId: invitation._id,
          companyId,
        });
      }

      // ================= SAME ROLE ACTIVE =================
      if (
        existing.userType === dto.userType &&
        existing.invitationStatus === 'ACTIVE'
      ) {
        throw new CustomError(
          400,
          'This role is already approved for this user',
        );
      }

      // ================= ROLE CHANGE / RESEND =================
      existing.userType = dto.userType;
      existing.invitationStatus = 'PENDING';
      existing.otp = otp;
      existing.otpExpires = otpExpires;

      await existing.save();

      await this.sendOtpMail(loggedInEmail, dto, otp);

      return new CustomResponse(200, 'OTP resent for approval', {
        invitationId: existing._id,
        companyId,
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ================= VERIFY OTP (SAAS SAFE) =================
  async verifyInvitationOtp(
    dto: VerifyInvitationOtpDto,
    companyId: string, // from JWT only
  ) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing from token.');
      }

      // ✅ Strict tenant isolation
      const invitation = await this.userRoleModel.findOne({
        companyId: new Types.ObjectId(companyId),
        otp: dto.otp,
        invitationStatus: 'PENDING',
      });

      if (!invitation) {
        throw new CustomError(400, 'Invalid OTP');
      }

      if (!invitation.otpExpires || invitation.otpExpires < new Date()) {
        invitation.invitationStatus = 'EXPIRED';
        await invitation.save();
        throw new CustomError(400, 'OTP expired');
      }

      invitation.invitationStatus = 'ACTIVE';
      invitation.otp = undefined;
      invitation.otpExpires = undefined;

      await invitation.save();

      return new CustomResponse(200, 'User activated successfully', {
        userEmail: invitation.userEmail,
        role: invitation.userType,
        companyId: invitation.companyId,
        status: invitation.invitationStatus,
      });
    } catch (error) {
      throwException(error);
    }
  }

  // ================= MAIL HELPER =================
  private async sendOtpMail(
    email: string,
    dto: SendInvitationDto,
    otp: string,
  ) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'User Role Approval Required',
      html: `
        <h3>Role Approval Request</h3>
        <p>Name: ${dto.fullLegalName}</p>
        <p>Email: ${dto.userEmail}</p>
        <p>Requested Role: ${dto.userType}</p>
        <h2>OTP: ${otp}</h2>
        <p>Valid for 10 minutes</p>
      `,
    });
  }
}