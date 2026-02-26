import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { CashAccount, CashAccountDocument } from './entities/cash-account.schema';
import { CashExpense, CashExpenseDocument } from './entities/cash-expense.entity';
import { Payee, PayeeDocument } from 'src/payee/entities/payee.entity';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class CashExpenseService {
  private transporter;

  constructor(
    @InjectModel(CashAccount.name)
    private accountModel: Model<CashAccountDocument>,

    @InjectModel(CashExpense.name)
    private expenseModel: Model<CashExpenseDocument>,

    @InjectModel(Payee.name)
    private payeeModel: Model<PayeeDocument>,
  ) {
    // ✅ FIXED MAIL CONFIG (ENV BASED)
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  // ================= CASH ACCOUNT =================
  async createCashAccount(dto: any, companyId: string) {
    try {
      const { cashAccountName, nickName, startingBalance } = dto;

      if (!cashAccountName || !nickName)
        throw new CustomError(400, 'cashAccountName and nickName are required');

      const account = await this.accountModel.create({
        cashAccountName,
        nickName,
        startingBalance: startingBalance || 0,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(201, 'Cash account created successfully', account);
    } catch (error) {
      throwException(error);
    }
  }

  async getCashAccounts(companyId: string) {
    try {
      const accounts = await this.accountModel.find({
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(200, 'Cash accounts fetched successfully', accounts);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= CREATE EXPENSE =================
  async createExpense(dto: any, companyId: string) {
    try {
      if (!dto.payee) throw new CustomError(400, 'Payee ID is required');

      const payee = await this.payeeModel.findById(dto.payee);
      if (!payee) throw new CustomError(404, 'Invalid Payee ID');

      const expense = await this.expenseModel.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(201, 'Expense created successfully', expense);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= GET ONE =================
  async getOne(id: string, companyId: string) {
    try {
      const expense = await this.expenseModel
        .findOne({
          _id: id,
          companyId: new Types.ObjectId(companyId),
        })
        .populate('payee')
        .populate('cashAccount');

      if (!expense) throw new CustomError(404, 'Expense not found');

      return new CustomResponse(200, 'Expense fetched successfully', expense);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= SEND EMAIL =================
  async sendEmail(id: string, companyId: string) {
    try {
      const expense = await this.expenseModel
        .findOne({
          _id: id,
          companyId: new Types.ObjectId(companyId),
        })
        .populate('payee');

      if (!expense) throw new CustomError(404, 'Expense not found');

      const payee: any = expense.payee;

      if (!payee?.email)
        throw new CustomError(400, 'Selected payee has no email');

      const html = `
        <h2>Cash Expense Receipt</h2>
        <p><b>Expense No:</b> ${expense.cashExpenseNo}</p>
        <p><b>Date:</b> ${expense.date}</p>
        <p><b>Amount:</b> ₹${expense.amount}</p>
        <p><b>Type:</b> ${expense.type}</p>
        <p><b>Memo:</b> ${expense.memo || '-'}</p>
      `;

      await this.transporter.sendMail({
        from: process.env.MAIL_USER,
        to: payee.email,
        subject: `Receipt - ${expense.cashExpenseNo}`,
        html,
      });

      return new CustomResponse(200, `Email sent to ${payee.email}`, true);
    } catch (error) {
      throwException(error);
    }
  }

  async signReceipt() {
    return new CustomResponse(200, 'Sign on receipt feature coming soon', true);
  }

  // ================= REMITTANCE =================
  async addRemittance(id: string, data: any, companyId: string) {
    try {
      const expense = await this.expenseModel.findOne({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!expense) throw new CustomError(404, 'Expense not found');

      const total = data.quantity * data.unitCost;

      expense.remittance.push({ ...data, total });

      expense.remittanceTotal = expense.remittance.reduce(
        (sum, item) => sum + item.total,
        0,
      );

      await expense.save();

      return new CustomResponse(200, 'Remittance added successfully', expense);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= COMMENT =================
  async addComment(id: string, comment: string, user: string, companyId: string) {
    try {
      const expense = await this.expenseModel.findOne({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!expense) throw new CustomError(404, 'Expense not found');

      expense.comments.push({
        user,
        comment,
        createdAt: new Date(),
      });

      await expense.save();

      return new CustomResponse(200, 'Comment added successfully', expense);
    } catch (error) {
      throwException(error);
    }
  }

  // ================= ATTACHMENT =================
  async addAttachment(id: string, file: any, user: string, companyId: string) {
    try {
      const expense = await this.expenseModel.findOne({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!expense) throw new CustomError(404, 'Expense not found');

      expense.attachments.push({
        fileName: file.originalname,
        filePath: file.filename,
        uploadedBy: user,
        uploadedAt: new Date(),
      });

      await expense.save();

      return new CustomResponse(200, 'Attachment added successfully', expense);
    } catch (error) {
      throwException(error);
    }
  }
}