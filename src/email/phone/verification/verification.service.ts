import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './entities/verification.entity';
import * as nodemailer from 'nodemailer';
import twilio from 'twilio';
import { ConfigService } from '@nestjs/config';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class VerificationService {
  private mailTransporter: nodemailer.Transporter;
  private twilioClient: twilio.Twilio;
  private fromPhone: string;

  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private readonly configService: ConfigService,
  ) {
    this.mailTransporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: Number(this.configService.get('MAIL_PORT')),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });

    this.fromPhone =
      this.configService.get<string>('TWILIO_PHONE') || '';

    this.twilioClient = twilio(
      this.configService.get('TWILIO_SID') as string,
      this.configService.get('TWILIO_AUTH_TOKEN') as string,
    );
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ================= EMAIL OTP =================

  async sendEmailOtp(email: string, companyId: string) {
    try {
      if (!email)
        throw new CustomError(400, 'Email is required');

      const otp = this.generateOtp();

      await this.otpModel.create({
        target: email,
        code: otp,
        type: 'email',
        companyId,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        verified: false,
      });

      await this.mailTransporter.sendMail({
        from:
          this.configService.get('MAIL_FROM') ||
          `"Verification" <${this.configService.get('MAIL_USER')}>`,
        to: email,
        subject: 'Email Verification OTP',
        html: `<h2>Your OTP</h2><h1>${otp}</h1>`,
      });

      return new CustomResponse(
        200,
        'OTP sent to email',
        true,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async verifyEmailOtp(
    email: string,
    otp: string,
    companyId: string,
  ) {
    try {
      const record = await this.otpModel.findOne({
        target: email,
        code: otp,
        type: 'email',
        companyId,
        expiresAt: { $gt: new Date() },
      });

      if (!record)
        throw new CustomError(
          400,
          'Invalid or expired OTP',
        );

      record.verified = true;
      await record.save();

      return new CustomResponse(
        200,
        'Email verified successfully',
        true,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= PHONE OTP =================

  async sendPhoneOtp(phone: string, companyId: string) {
    try {
      if (!phone)
        throw new CustomError(
          400,
          'Phone number is required',
        );

      if (!this.fromPhone)
        throw new CustomError(
          400,
          'Twilio phone not configured',
        );

      if (phone === this.fromPhone) {
        throw new CustomError(
          400,
          'From and To phone number cannot be same (Twilio rule)',
        );
      }

      const otp = this.generateOtp();

      await this.otpModel.create({
        target: phone,
        code: otp,
        type: 'phone',
        companyId,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        verified: false,
      });

      await this.twilioClient.messages.create({
        body: `Your verification OTP is ${otp}`,
        from: this.fromPhone,
        to: phone.startsWith('+')
          ? phone
          : `+91${phone}`,
      });

      return new CustomResponse(
        200,
        'OTP sent to phone',
        true,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async verifyPhoneOtp(
    phone: string,
    otp: string,
    companyId: string,
  ) {
    try {
      const record = await this.otpModel.findOne({
        target: phone,
        code: otp,
        type: 'phone',
        companyId,
        expiresAt: { $gt: new Date() },
      });

      if (!record)
        throw new CustomError(
          400,
          'Invalid or expired OTP',
        );

      record.verified = true;
      await record.save();

      return new CustomResponse(
        200,
        'Phone verified successfully',
        true,
      );
    } catch (error) {
      throwException(error);
    }
  }
}