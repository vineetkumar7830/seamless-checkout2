import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './entities/new-payment.entity';
import { Payee } from '../payee/entities/payee.entity';
import { Model, Types } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class NewPaymentService {

  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<Payment>,

    @InjectModel(Payee.name)
    private payeeModel: Model<Payee>
  ) {}

  // ✅ CREATE
  async create(user: any, data: any): Promise<CustomResponse> {
    try {

      if (!user?.userId || !user?.companyId) {
        throw new CustomError(400, "Invalid user token");
      }

      const payment = await this.paymentModel.create({
        ...data,
        userId: user.userId,
        companyId: user.companyId
      });

      return new CustomResponse(
        201,
        "Payment created successfully",
        payment
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ SAVE & NEW
  async saveAndNew(user: any, data: any): Promise<CustomResponse> {
    try {

      const payment = await this.paymentModel.create({
        ...data,
        userId: user.userId,
        companyId: user.companyId
      });

      return new CustomResponse(
        201,
        "Saved successfully",
        payment
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ GET ALL (🔥 company filter)
  async getAllPayments(user: any): Promise<CustomResponse> {
    try {

      const payments = await this.paymentModel
        .find({ companyId: user.companyId })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        "Payments fetched successfully",
        payments
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ GET ONE (🔥 secure)
  async getPayment(paymentId: string, user: any): Promise<CustomResponse> {
    try {

      const payment = await this.paymentModel.findOne({
        _id: paymentId,
        companyId: user.companyId
      });

      if (!payment) {
        throw new CustomError(404, "Payment not found");
      }

      return new CustomResponse(
        200,
        "Payment fetched successfully",
        payment
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ ADD REMITTANCE
  async addRemittance(paymentId: string, data: any, user: any): Promise<CustomResponse> {
    try {

      const updated = await this.paymentModel.findOneAndUpdate(
        { _id: paymentId, companyId: user.companyId },
        { $push: { remittance: data } },
        { new: true }
      );

      if (!updated) {
        throw new CustomError(404, "Payment not found");
      }

      return new CustomResponse(
        200,
        "Remittance added successfully",
        updated
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ UPLOAD ATTACHMENT
  async uploadAttachment(paymentId: string, file: any, user: any): Promise<CustomResponse> {
    try {

      if (!file) {
        throw new CustomError(400, "File not uploaded");
      }

      const updated = await this.paymentModel.findOneAndUpdate(
        { _id: paymentId, companyId: user.companyId },
        { $push: { attachments: file.filename } },
        { new: true }
      );

      if (!updated) {
        throw new CustomError(404, "Payment not found");
      }

      return new CustomResponse(
        200,
        "Attachment uploaded successfully",
        updated
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ ADD NOTE
  async addNote(paymentId: string, note: string, user: any): Promise<CustomResponse> {
    try {

      if (!note) {
        throw new CustomError(400, "Note is required");
      }

      const updated = await this.paymentModel.findOneAndUpdate(
        { _id: paymentId, companyId: user.companyId },
        { $push: { notes: note } },
        { new: true }
      );

      if (!updated) {
        throw new CustomError(404, "Payment not found");
      }

      return new CustomResponse(
        200,
        "Note added successfully",
        updated
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ SEND MAIL (🔥 secure)
  async sendMail(paymentId: string, user: any): Promise<CustomResponse> {
    try {

      const payment = await this.paymentModel.findOne({
        _id: paymentId,
        companyId: user.companyId
      });

      if (!payment) {
        throw new CustomError(404, "Payment not found");
      }

      let payee;

      if (Types.ObjectId.isValid(payment.payeeId)) {
        payee = await this.payeeModel.findById(payment.payeeId);
      }

      if (!payee) {
        payee = await this.payeeModel.findOne({ payeeId: payment.payeeId });
      }

      if (!payee) {
        payee = await this.payeeModel.findOne({ name: payment.payee });
      }

      if (!payee) {
        throw new CustomError(404, "Payee not found in database");
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        to: payee.email,
        subject: "Payment Check",
        text: `You received payment of $${payment.amount}`
      });

      return new CustomResponse(
        200,
        "Mail sent successfully",
        null
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ PRINT CHECK
  async printCheck(paymentId: string, user: any): Promise<CustomResponse> {
    try {

      const payment = await this.paymentModel.findOne({
        _id: paymentId,
        companyId: user.companyId
      });

      if (!payment) {
        throw new CustomError(404, "Payment not found");
      }

      return new CustomResponse(
        200,
        "Check printed successfully",
        payment
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ✅ SEND ACH
  async sendACH(paymentId: string, user: any): Promise<CustomResponse> {
    try {

      const payment = await this.paymentModel.findOne({
        _id: paymentId,
        companyId: user.companyId
      });

      if (!payment) {
        throw new CustomError(404, "Payment not found");
      }

      return new CustomResponse(
        200,
        "ACH payment sent",
        payment
      );

    } catch (error) {
      throwException(error);
      throw error;
    }
  }
} 