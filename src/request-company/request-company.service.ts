import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  RequestCompany,
  RequestCompanyDocument,
} from './entities/request-company.entity';

import { CreateRequestCompanyDto } from './dto/create-request-company.dto';
import { VerifyRequestCompanyOtpDto } from './dto/verify-request-company-otp.dto';

import * as nodemailer from 'nodemailer';

@Injectable()
export class RequestCompanyService {

  constructor(
    @InjectModel(RequestCompany.name)
    private requestCompanyModel: Model<RequestCompanyDocument>,
  ) {}

  // OTP GENERATOR
  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // SEND OTP EMAIL
  async sendOtpEmail(email: string, otp: string) {

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false, // IMPORTANT (587 port ke liye false)
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Seamless Checkout" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'OTP Verification',
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>OTP Verification</h2>
          <p>Your OTP for company request verification is:</p>
          <h1 style="color:#2e86de">${otp}</h1>
          <p>This OTP is valid for verification.</p>
        </div>
      `,
    });
  }

  // CREATE REQUEST
  async create(dto: CreateRequestCompanyDto, userId: string, userEmail: string) {

    if (dto.YourEmployerEmail !== dto.ConfirmYourEmployerEmail) {
      throw new BadRequestException('Email not match');
    }

    const otp = this.generateOtp();

    const request = await this.requestCompanyModel.create({
      ...dto,
      userId: new Types.ObjectId(userId),
      otp,
    });

    // SEND OTP REGISTERED EMAIL
    await this.sendOtpEmail(userEmail, otp);

    return {
      message: 'OTP sent to your registered email',
      requestId: request._id,
    };
  }

  // VERIFY OTP
  async verifyOtp(dto: VerifyRequestCompanyOtpDto) {

    const request = await this.requestCompanyModel.findById(dto.requestId);

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.otp !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    request.isVerified = true;
    request.otp = '';

    await request.save();

    return {
      message: 'Requested company created successfully',
    };
  }
}