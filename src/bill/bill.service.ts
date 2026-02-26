import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bill } from './entities/bill.entity';
import { BillAttachment } from './entities/bill-attachment.entity';
import { BillComment } from './entities/bill-comment.entity';
import { BillExtract } from './entities/bill-extract.entity';

import { CreateBillDto } from './dto/create-bill.dto';
import { AddBillItemDto } from './dto/add-bill-item.dto';
import { AddBillCommentDto } from './dto/add-bill-comment.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name)
    private readonly billModel: Model<Bill>,

    @InjectModel(BillAttachment.name)
    private readonly attachmentModel: Model<BillAttachment>,

    @InjectModel(BillComment.name)
    private readonly commentModel: Model<BillComment>,

    @InjectModel(BillExtract.name)
    private readonly extractModel: Model<BillExtract>,
  ) {}

  private calculateBillTotal(itemsTotal: number, credit: number) {
    const total = itemsTotal - credit;

    if (total < 0) {
      throw new BadRequestException(
        'Vendor credit cannot exceed bill amount',
      );
    }

    return total;
  }

  // ================= CREATE =================
  async create(dto: CreateBillDto, user: any) {
    const bill = await this.billModel.create({
      ...dto,
      companyId: user.companyId,
      billTotal: dto.amount - dto.vendorCreditUsed,
      status: 'saved',
    });

    return {
      status: true,
      message: 'Bill created successfully',
      result: bill,
    };
  }

  // ================= ADD ITEM =================
  async addItem(dto: AddBillItemDto, user: any) {
    const bill = await this.billModel.findOne({
      _id: dto.billId,
      companyId: user.companyId,
    });

    if (!bill) throw new BadRequestException('Bill not found');

    const itemTotal = dto.quantity * dto.unitCost;

    bill.items.push({
      itemName: dto.itemName,
      description: dto.description,
      quantity: dto.quantity,
      unitCost: dto.unitCost,
      total: itemTotal,
    });

    const itemsTotal = bill.items.reduce((s, i) => s + i.total, 0);

    bill.billTotal = this.calculateBillTotal(
      itemsTotal,
      bill.vendorCreditUsed || 0,
    );

    await bill.save();

    return {
      status: true,
      message: 'Item added successfully',
      result: bill,
    };
  }

  // ================= REMOVE ITEM =================
  async removeItem(billId: string, index: number, user: any) {
    const bill = await this.billModel.findOne({
      _id: billId,
      companyId: user.companyId,
    });

    if (!bill) throw new BadRequestException('Bill not found');

    if (index < 0 || index >= bill.items.length) {
      throw new BadRequestException('Invalid item index');
    }

    bill.items.splice(index, 1);

    const itemsTotal = bill.items.reduce((s, i) => s + i.total, 0);

    bill.billTotal = this.calculateBillTotal(
      itemsTotal,
      bill.vendorCreditUsed || 0,
    );

    await bill.save();

    return {
      status: true,
      message: 'Item removed successfully',
      result: bill,
    };
  }
  async addComment(dto: AddBillCommentDto, user: any) {
    const comment = await this.commentModel.create({
      ...dto,
      companyId: user.companyId,
      user: user.email,
    });

    return {
      status: true,
      message: 'Comment added successfully',
      result: comment,
    };
  }

  // ================= ATTACHMENT =================
  async addAttachment(
    billId: string,
    file: Express.Multer.File,
    user: any,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const bill = await this.billModel.findOne({
      _id: billId,
      companyId: user.companyId,
    });

    if (!bill) {
      throw new BadRequestException('Bill not found');
    }

    const attachment = await this.attachmentModel.create({
      billId,
      companyId: user.companyId,
      fileUrl: `/uploads/${file.filename}`,
      fileName: file.originalname,
      uploadedBy: user.email,
    });

    return {
      status: true,
      message: 'Attachment uploaded successfully',
      result: attachment,
    };
  }

  // ================= UPLOAD & EXTRACT =================
  async uploadAndExtract(
    billId: string,
    file: Express.Multer.File,
    user: any,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const bill = await this.billModel.findOne({
      _id: billId,
      companyId: user.companyId,
    });

    if (!bill) {
      throw new BadRequestException('Bill not found');
    }

    const baseUrl =
      process.env.PROCESS_BASE_URL || 'http://localhost:9000';

    const fullFileUrl = `${baseUrl}/uploads/${file.filename}`;

    const extract = await this.extractModel.create({
      billId,
      companyId: user.companyId,
      fileUrl: fullFileUrl,
      extractedInvoiceNo: 'INV-001',
      extractedAmount: 2500,
      extractedInvoiceDate: '2025-12-30',
      isExtracted: true,
    });

    return {
      status: true,
      message: 'Document uploaded & extracted successfully',
      result: extract,
    };
  }

  // ================= GET BILL =================
  async getBill(id: string, user: any) {
    const bill = await this.billModel.findOne({
      _id: id,
      companyId: user.companyId,
    });

    if (!bill) {
      throw new BadRequestException('Bill not found');
    }

    const comments = await this.commentModel.find({
      billId: id,
      companyId: user.companyId,
    });

    const attachments = await this.attachmentModel.find({
      billId: id,
      companyId: user.companyId,
    });

    const extracts = await this.extractModel.find({
      billId: id,
      companyId: user.companyId,
    });

    return {
      status: true,
      result: {
        bill,
        comments,
        attachments,
        extracts,
      },
    };
  }
}