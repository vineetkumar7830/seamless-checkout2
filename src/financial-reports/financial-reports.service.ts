import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FinancialReport } from './entities/financial-report.entity';
import { CreateFinancialReportDto } from './dto/create-financial-report.dto';
import { UpdateFinancialReportDto } from './dto/update-financial-report.dto';

import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class FinancialReportsService {
  constructor(
    @InjectModel(FinancialReport.name)
    private reportModel: Model<FinancialReport>,
  ) {}

  // ================= Currency Symbol =================
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

  // ================= CREATE =================
  async create(dto: CreateFinancialReportDto, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const report = await this.reportModel.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Financial report created successfully',
        report,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND ALL =================
  async findAll(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing.');
      }

      const reports = await this.reportModel.find({
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        200,
        'Financial reports fetched successfully',
        reports,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND ONE =================
  async findOne(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing.');
      }

      const report = await this.reportModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!report) {
        throw new CustomError(404, 'Financial report not found');
      }

      return new CustomResponse(
        200,
        'Financial report fetched successfully',
        report,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= UPDATE =================
  async update(id: string, dto: UpdateFinancialReportDto, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing.');
      }

      const updated = await this.reportModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          companyId: new Types.ObjectId(companyId),
        },
        dto,
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Financial report not found');
      }

      return new CustomResponse(
        200,
        'Financial report updated successfully',
        updated,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= DELETE =================
  async delete(id: string, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing.');
      }

      const deleted = await this.reportModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!deleted) {
        throw new CustomError(404, 'Financial report not found');
      }

      return new CustomResponse(
        200,
        'Financial report deleted successfully',
        null,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= GENERATE PDF =================
async generatePdf(id: string, companyId: string) {
  try {
    if (!companyId) {
      throw new CustomError(401, 'Company context missing.');
    }

    const report = await this.reportModel.findOne({
      _id: new Types.ObjectId(id),
      companyId: new Types.ObjectId(companyId),
    });

    if (!report) {
      throw new CustomError(404, 'Financial report not found');
    }

    const currencySymbol = this.getCurrencySymbol(report.currency || 'USD');

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const fileName = `premium-invoice-${id}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    doc.pipe(fs.createWriteStream(filePath));

    const pageWidth = doc.page.width;

    // ================= HEADER =================
    doc.rect(0, 0, pageWidth, 90).fill('#1a73e8');

    doc.fillColor('#ffffff')
      .fontSize(26)
      .text('INVOICE', 40, 35);

    doc.fontSize(10)
      .text(`Invoice ID: ${report._id}`, pageWidth - 220, 35, { align: 'right' })
      .text(`Date: ${new Date().toDateString()}`, pageWidth - 220, 50, { align: 'right' });

    doc.fillColor('#000000');

    // ================= COMPANY INFO =================
    const top = 110;

    doc.fontSize(12).font('Helvetica-Bold')
      .text('Your Company Pvt Ltd', 40, top);

    doc.fontSize(10).font('Helvetica')
      .text('GSTIN: 22AAAAA0000A1Z5', 40, top + 15)
      .text('support@company.com', 40, top + 30)
      .text('+91 9876543210', 40, top + 45);

    // ================= BILL TO =================
    doc.font('Helvetica-Bold').text('Bill To:', 350, top);

    doc.font('Helvetica')
      .text(report.payeeName, 350, top + 15)
      .text(report.payeeEmail || '-', 350, top + 30)
      .text(report.payeePhone || '-', 350, top + 45);

    // ================= STATUS BADGE =================
    const status = 'PAID'; // change dynamically if needed
    doc.roundedRect(pageWidth - 150, top + 70, 100, 25, 5)
      .fill(status === 'PAID' ? '#34a853' : '#ea4335');

    doc.fillColor('#ffffff')
      .fontSize(10)
      .text(status, pageWidth - 125, top + 78, { align: 'center' });

    doc.fillColor('#000000');

    // ================= TABLE HEADER =================
    const tableTop = top + 120;

    doc.rect(40, tableTop, pageWidth - 80, 30).fill('#f1f3f4');
    doc.fillColor('#000000');

    doc.font('Helvetica-Bold').fontSize(11);
    doc.text('Description', 50, tableTop + 10);
    doc.text('Date', 270, tableTop + 10);
    doc.text('Qty', 380, tableTop + 10);
    doc.text('Amount', 430, tableTop + 10);

    // ================= TABLE ROW =================
    const rowTop = tableTop + 30;

    doc.font('Helvetica').fontSize(10);
    doc.text(report.memo || 'Professional Service', 50, rowTop);
    doc.text(new Date(report.transactionDate).toDateString(), 270, rowTop);
    doc.text('1', 390, rowTop);
    doc.text(`${currencySymbol}${report.amount}`, 430, rowTop);

    doc.moveTo(40, rowTop + 20)
      .lineTo(pageWidth - 40, rowTop + 20)
      .stroke();

    // ================= TOTAL SECTION =================
    const summaryTop = rowTop + 50;

    const subtotal = report.amount;
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    doc.fontSize(10);
    doc.text('Subtotal:', 350, summaryTop);
    doc.text(`${currencySymbol}${subtotal.toFixed(2)}`, 450, summaryTop);

    doc.text('GST (18%):', 350, summaryTop + 20);
    doc.text(`${currencySymbol}${tax.toFixed(2)}`, 450, summaryTop + 20);

    doc.font('Helvetica-Bold');
    doc.rect(340, summaryTop + 40, 180, 30).stroke();

    doc.text('Grand Total:', 350, summaryTop + 50);
    doc.text(`${currencySymbol}${total.toFixed(2)}`, 450, summaryTop + 50);

    // ================= QR CODE =================
    const qrImagePath = path.join(process.cwd(), 'uploads', 'qr.png');
    if (fs.existsSync(qrImagePath)) {
      doc.image(qrImagePath, 50, summaryTop + 40, { width: 80 });
      doc.fontSize(8).text('Scan to Pay', 60, summaryTop + 125);
    }

    // ================= SIGNATURE =================
    doc.moveTo(pageWidth - 200, doc.page.height - 100)
      .lineTo(pageWidth - 60, doc.page.height - 100)
      .stroke();

    doc.fontSize(9)
      .text('Authorized Signature', pageWidth - 190, doc.page.height - 90);

    // ================= FOOTER =================
    doc.fontSize(8).font('Helvetica');
    doc.text(
      'This is a computer-generated invoice and does not require a physical signature.',
      40,
      doc.page.height - 50,
      { align: 'center', width: pageWidth - 80 },
    );

    doc.end();

    const baseUrl = process.env.SERVER_BASE_URL || 'http://localhost:9000';
    const pdfUrl = `${baseUrl}/uploads/${fileName}`;

    await this.reportModel.findByIdAndUpdate(id, { pdfUrl });

    return new CustomResponse(
      200,
      'Premium invoice generated successfully',
      { id, pdfUrl },
    );
  } catch (error) {
    throwException(error);
  }
}

}