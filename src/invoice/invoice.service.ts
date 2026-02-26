import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { Invoice } from './entities/invoice.entity';
import { InvoiceAttachment } from './entities/invoice-attachment.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { SendInvoiceDto } from './dto/send-invoice.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<Invoice>,

    @InjectModel(InvoiceAttachment.name)
    private readonly attachmentModel: Model<InvoiceAttachment>,
  ) { }

  private baseUrl(): string {
    return process.env.BASE_URL?.trim()
      ? process.env.BASE_URL
      : 'http://localhost:9000';
  }

  async create(
    dto: CreateInvoiceDto,
    companyId: string,
    logo?: Express.Multer.File,
  ): Promise<CustomResponse> {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyId: _, ...invoiceData } = dto as any;
      
      const data: Partial<Invoice> = {
        ...invoiceData,
        companyId: new Types.ObjectId(companyId),
        items: dto.items.map((row, index) => ({
          sn: row.sn ?? index + 1,
          item: row.item,
          description: row.description ?? '',
          qty: row.qty,
          unitCost: row.unitCost,
          discount: row.discount ?? 0,
          discountAmount: row.discountAmount ?? 0,
          total: row.total,
          itemTotal: row.itemTotal,
        })),
      };

      if (logo) {
        data.logoUrl = `${this.baseUrl()}/uploads/invoice/${logo.filename}`;
      }

      const invoice = await this.invoiceModel.create(data);

      return new CustomResponse(201, 'Invoice created successfully', invoice);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findAll(companyId: string): Promise<CustomResponse> {
    try {
      if (!Types.ObjectId.isValid(companyId)) {
        throw new CustomError(400, 'Invalid company id');
      }

      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const invoices = await this.invoiceModel
        .find({ companyId: new Types.ObjectId(companyId) })
        .sort({ createdAt: -1 });

      return new CustomResponse(
        200,
        'Invoices fetched successfully',
        invoices,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async findOne(id: string, companyId: string): Promise<CustomResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid invoice id');
      }
      if (!Types.ObjectId.isValid(companyId)) {
        throw new CustomError(400, 'Invalid company id');
      }

      const invoice = await this.invoiceModel.findOne({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });
      if (!invoice) {
        throw new CustomError(404, 'Invoice not found');
      }

      if (!invoice) {
        throw new CustomError(404, 'Invoice not found');
      }
      return new CustomResponse(200, 'Invoice fetched', invoice);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async update(
    id: string,
    dto: Partial<CreateInvoiceDto>,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid invoice id');
      }
      if (!Types.ObjectId.isValid(companyId)) {
        throw new CustomError(400, 'Invalid company id');
      }

      const updated = await this.invoiceModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id), companyId: new Types.ObjectId(companyId) },
        dto,
        { new: true },
      );

      if (!updated) {
        throw new CustomError(404, 'Invoice not found');
      }

      return new CustomResponse(200, 'Invoice updated', updated);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async remove(id: string, companyId: string): Promise<CustomResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid invoice id');
      }
      if (!Types.ObjectId.isValid(companyId)) {
        throw new CustomError(400, 'Invalid company id');
      }

      const deleted = await this.invoiceModel.findOneAndDelete({
        _id: new Types.ObjectId(id),
        companyId: new Types.ObjectId(companyId),
      });

      if (!deleted) {
        throw new CustomError(404, 'Invoice not found');
      }

      return new CustomResponse(200, 'Invoice deleted', null);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async addAttachments(
    invoiceId: string,
    files: Express.Multer.File[],
  ): Promise<CustomResponse> {
    try {
      if (!Types.ObjectId.isValid(invoiceId)) {
        throw new CustomError(400, 'Invalid invoice id');
      }

      const invoice = await this.invoiceModel.findById(invoiceId);
      if (!invoice) {
        throw new CustomError(404, 'Invoice not found');
      }

      const attachments = await this.attachmentModel.insertMany(
        files.map(file => ({
          invoiceId,
          fileUrl: `${this.baseUrl()}/uploads/invoice/attachments/${file.filename}`,
        })),
      );

      return new CustomResponse(
        201,
        'Attachments added successfully',
        attachments,
      );
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= GET ATTACHMENTS =================
  async getAttachments(invoiceId: string): Promise<CustomResponse> {
    try {
      const data = await this.attachmentModel.find({ invoiceId });
      return new CustomResponse(200, 'Attachments fetched', data);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= DELETE ATTACHMENT =================
  async removeAttachment(id: string): Promise<CustomResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new CustomError(400, 'Invalid attachment id');
      }

      const deleted = await this.attachmentModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new CustomError(404, 'Attachment not found');
      }

      return new CustomResponse(200, 'Attachment deleted', null);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= SEND INVOICE =================
  async sendInvoice(dto: SendInvoiceDto): Promise<CustomResponse> {
    return new CustomResponse(200, 'Invoice sent (mock)', null);
  }
}
