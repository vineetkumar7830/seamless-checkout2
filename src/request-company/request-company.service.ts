import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  RequestCompany,
  RequestCompanyDocument,
} from './entities/request-company.entity';

import { CreateRequestCompanyDto } from './dto/create-request-company.dto';
import { VerifyRequestCompanyOtpDto } from './dto/verify-request-company-otp.dto';

import * as nodemailer from 'nodemailer';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class RequestCompanyService {

  constructor(
    @InjectModel(RequestCompany.name)
    private requestCompanyModel: Model<RequestCompanyDocument>,
  ) { }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtpEmail(email: string, otp: string) {

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Company Verification" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'OTP Verification',
      html: `
      <h2>Your OTP Code</h2>
      <h1>${otp}</h1>
      `,
    });
  }

  async create(
    dto: CreateRequestCompanyDto,
    userId: string,
    userEmail: string,
  ): Promise<CustomResponse> {

    try {

      if (!userId) {
        throw new CustomError(401, 'User context missing. Please relogin.');
      }

      if (dto.YourEmployerEmail !== dto.ConfirmYourEmployerEmail) {
        throw new CustomError(400, 'Emails do not match');
      }

      const otp = this.generateOtp();

      const request = await this.requestCompanyModel.create({
        ...dto,
        userId: new Types.ObjectId(userId),
        otp,
      });

      await this.sendOtpEmail(userEmail, otp);

      return new CustomResponse(
        201,
        'OTP sent to your registered email',
        {
          requestId: request._id,
        },
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async verifyOtp(dto: VerifyRequestCompanyOtpDto): Promise<CustomResponse> {

    try {

      const request = await this.requestCompanyModel.findById(dto.requestId);

      if (!request) {
        throw new CustomError(404, 'Request not found');
      }

      if (request.otp !== dto.otp) {
        throw new CustomError(400, 'Invalid OTP');
      }

      request.isVerified = true;
      request.otp = '';

      await request.save();

      return new CustomResponse(
        200,
        'Company created successfully',
        request,
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}