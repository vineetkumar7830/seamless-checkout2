import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ExportOption } from './entities/export-option.entity';
import { CreateExportDto } from './dto/create-export-option.dto';
import { UpdateExportDto } from './dto/update-export-option.dto';

import * as fs from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class ExportService {
  constructor(
    @InjectModel(ExportOption.name)
    private exportModel: Model<ExportOption>,
  ) { }

  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'USD':
      case 'CAD':
        return '$';
      case 'INR':
        return '₹';
      case 'EUR':
        return '€';
      default:
        return '$';
    }
  }

  async create(dto: CreateExportDto, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const { companyId: _, ...exportData } = dto as any;

      const data = await this.exportModel.create({
        ...exportData,
        companyId: new Types.ObjectId(companyId),
      });

      const currencySymbol = this.getCurrencySymbol(data.currency || 'USD');

      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

      const fileName = `invoice-${data._id}.pdf`;
      const filePath = path.join(uploadsDir, fileName);

      await this.generateInvoicePdf(data, currencySymbol, filePath);

      const baseUrl = process.env.SERVER_BASE_URL || 'http://localhost:9000';
      const pdfUrl = `${baseUrl}/uploads/${fileName}`;

      await this.exportModel.findByIdAndUpdate(data._id, { pdfUrl });

      if (data.payeeEmail) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"SEAMLESS Finance" <${process.env.MAIL_USER}>`,
          to: data.payeeEmail,
          subject: 'Your Invoice PDF',
          html: `
            <h2>Hello ${data.payeeName}</h2>
            <p>Your invoice has been generated.</p>
            <p><b>Amount:</b> ${currencySymbol}${data.amount}</p>
            <p>You can download your invoice here:</p>
            <a href="${pdfUrl}">${pdfUrl}</a>
          `,
          attachments: [
            {
              filename: 'invoice.pdf',
              path: filePath,
            },
          ],
        });
      }

      return new CustomResponse(
        201,
        'Invoice created, PDF generated & email sent successfully',
        { ...data.toObject(), pdfUrl },
      );
    } catch (error) {
      throwException(error);
    }
  }

  async findAll(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const data = await this.exportModel.find({
        companyId: new Types.ObjectId(companyId),
      });
      return new CustomResponse(200, 'Exports fetched successfully', data);
    } catch (error) {
      throwException(error);
    }
  }

  async findOne(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const data = await this.exportModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!data) throw new CustomError(404, 'Data not found');

      return new CustomResponse(200, 'Export fetched successfully', data);
    } catch (error) {
      throwException(error);
    }
  }

  async update(id: string, dto: UpdateExportDto, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const updated = await this.exportModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        { ...dto, companyId: new Types.ObjectId(companyId) },
        { new: true },
      );

      if (!updated) throw new CustomError(404, 'Data not found');

      return new CustomResponse(200, 'Export updated successfully', updated);
    } catch (error) {
      throwException(error);
    }
  }


  async delete(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const deleted = await this.exportModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });
      if (!deleted) throw new CustomError(404, 'Data not found');
      if (!deleted) throw new CustomError(404, 'Data not found');
      return new CustomResponse(200, 'Deleted successfully', null)

    } catch (error) {
      throwException(error);
    }
  }

  async preview(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const data = await this.exportModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!data) throw new CustomError(404, 'Data not found');

      return new CustomResponse(200, 'Preview fetched successfully', data);
    } catch (error) {
      throwException(error);
    }
  }

  async exportPdf(id: string) {
    try {
      const data = await this.exportModel.findById(id);

      if (!data) throw new CustomError(404, 'Data not found');

      const currencySymbol = this.getCurrencySymbol(data.currency || 'USD');

      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

      const fileName = `invoice-${id}.pdf`;
      const filePath = path.join(uploadsDir, fileName);

      await this.generateInvoicePdf(data, currencySymbol, filePath);

      return new CustomResponse(200, 'PDF generated successfully', {
        pdfPath: filePath,
      });
    } catch (error) {
      throwException(error);
    }
  }

  async generateInvoicePdf(data: any, currencySymbol: string, filePath: string) {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text('SEAMLESS', 40, 30);
    doc.fontSize(10).text('TAX INVOICE', 420, 30);

    doc.moveTo(40, 60).lineTo(550, 60).stroke();

    doc.fontSize(10);
    doc.text(`Invoice No : ${data._id}`, 40, 80);
    doc.text(`Date : ${data.date}`, 40, 95);

    doc.text(`Payee Name : ${data.payeeName}`, 300, 80);
    doc.text(`Email : ${data.payeeEmail || '-'}`, 300, 95);


    doc.moveTo(40, 120).lineTo(550, 120).stroke();

    let y = 150;
    doc.text('Description', 40, y);
    doc.text('Amount', 400, y);

    y += 10;
    doc.moveTo(40, y).lineTo(550, y).stroke();

    y += 15;
    doc.text(data.memo || 'Invoice Payment', 40, y);
    doc.text(`${currencySymbol}${data.amount}`, 400, y);

    y += 40;
    doc.fontSize(12).text(`Grand Total : ${currencySymbol}${data.amount}`, 350, y);

    doc.fontSize(9);
    doc.text(
      'This is a computer generated invoice. No signature required.',
      40,
      doc.page.height - 80,
      { align: 'center' },
    );

    doc.text(
      'Thank you for choosing SEAMLESS',
      40,
      doc.page.height - 60,
      { align: 'center' },
    );
    doc.end();

    await new Promise<void>((resolve, reject) => {
      stream.on('finish', () => resolve());
      stream.on('error', (err) => reject(err));
    });
  }
}
