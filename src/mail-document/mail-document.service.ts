import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';

import {
  MailDocument,
  MailDocumentDocument,
  Recipient,
} from './entities/mail-document.entity';

import { CreateMailDto } from './dto/create-mail-document.dto';
import { Payee } from '../payee/entities/payee.entity';
import { Addaddress } from '../addaddress/entities/addaddress.entity';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class MailDocumentService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  constructor(
    @InjectModel(MailDocument.name)
    private readonly mailModel: Model<MailDocumentDocument>,

    @InjectModel(Payee.name)
    private readonly payeeModel: Model<Payee>,

    @InjectModel(Addaddress.name)
    private readonly addAddressModel: Model<Addaddress>,
  ) {}

  async create(dto: CreateMailDto, companyId: string) {
    try {
      if (!dto.recipients?.length) {
        throw new CustomError(400, 'At least one recipient required');
      }

      let totalCost = 0;
      const formattedRecipients: Recipient[] = [];

      for (const r of dto.recipients) {
        totalCost += Number(r.shippingPrice);

        if (
          !Types.ObjectId.isValid(r.from) ||
          !Types.ObjectId.isValid(r.payee)
        ) {
          throw new CustomError(400, 'Invalid ObjectId');
        }

        const fromId = new Types.ObjectId(r.from);
        const payeeId = new Types.ObjectId(r.payee);

        const fromAddress = await this.addAddressModel.findById(fromId);
        if (!fromAddress) {
          throw new CustomError(400, 'From address not found');
        }

        const filePath = r.fileName
          ? path.join(process.cwd(), 'uploads', r.fileName)
          : null;

        const attachments =
          filePath && fs.existsSync(filePath)
            ? [{ filename: r.fileName, path: filePath }]
            : [];

        if (fromAddress.email) {
          try {
            await this.transporter.sendMail({
              from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USER}>`,
              to: fromAddress.email,
              subject: 'New Document Mail',
              html: `
                <h3>Hello ${fromAddress.name}</h3>
                <p>You have received a document.</p>
                <p><b>File:</b> ${r.fileName}</p>
                <p><b>Shipping:</b> ${r.shippingType}</p>
                <p><b>Price:</b> ₹${r.shippingPrice}</p>
              `,
              attachments,
            });
          } catch (mailError) {
            console.log('Email sending failed:', mailError.message);
          }
        }

        formattedRecipients.push({
          fileName: r.fileName,
          from: fromId,
          payee: payeeId,
          shippingType: r.shippingType,
          shippingPrice: r.shippingPrice,
        });
      }

      const created = await new this.mailModel({
        companyId: new Types.ObjectId(companyId),
        defaultFrom:
          dto.defaultFrom && Types.ObjectId.isValid(dto.defaultFrom)
            ? new Types.ObjectId(dto.defaultFrom)
            : undefined,
        defaultShippingType: dto.defaultShippingType,
        recipients: formattedRecipients,
        totalShippingCost: totalCost,
      }).save();

      const populated = await this.mailModel
        .findById(created._id)
        .populate('defaultFrom')
        .populate('recipients.from')
        .populate('recipients.payee');

      return new CustomResponse(
        201,
        'Mail document created successfully',
        populated,
      );
    } catch (error) {
      console.log('MAIL CREATE ERROR:', error);

      throwException(
        error instanceof CustomError
          ? error
          : new CustomError(400, error?.message || 'Mail creation failed'),
      );
    }
  }

  async findAll(companyId: string) {
    try {
      const mails = await this.mailModel
        .find({ companyId: new Types.ObjectId(companyId) })
        .populate('defaultFrom')
        .populate('recipients.from')
        .populate('recipients.payee');

      return new CustomResponse(
        200,
        'Mail documents fetched successfully',
        mails,
      );
    } catch (error) {
      throwException(error);
    }
  }
}