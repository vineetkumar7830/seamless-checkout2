import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Check, CheckDocument } from './entities/check.entity';
import { CreateCheckDto } from './dto/create-check.dto';
import { TemplateEditorDto } from './dto/template-editor.dto';
import { ApprovalStatusDto } from './dto/approval-status.dto';
import { PrintDownloadDto } from './dto/print-download.dto';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class CheckService {
  constructor(
    @InjectModel(Check.name)
    private readonly checkModel: Model<CheckDocument>,
  ) { }

  // ================= CREATE CHECK =================
  async createCheck(dto: CreateCheckDto, companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const check = await this.checkModel.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        201,
        'Check created successfully',
        check,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= UPDATE TEMPLATE =================

  async updateTemplate(id: string, dto: TemplateEditorDto, companyId: string) {
    try {
      const check = await this.checkModel.findOneAndUpdate(
        { _id: id, companyId: new Types.ObjectId(companyId) },
        { $set: { ...dto, companyId: new Types.ObjectId(companyId) } },
        { new: true, runValidators: true },
      );

      if (!check) {
        throw new CustomError(404, 'Check not found');
      }

      return new CustomResponse(
        200,
        'Check template updated successfully',
        check,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= UPDATE APPROVAL =================
  async updateApproval(id: string, dto: ApprovalStatusDto, companyId: string) {
    try {
      const check = await this.checkModel.findOneAndUpdate(
        { _id: id, companyId: new Types.ObjectId(companyId) },
        { $set: { ...dto, companyId: new Types.ObjectId(companyId) } },
        { new: true },
      );

      if (!check) {
        throw new CustomError(404, 'Check not found');
      }

      return new CustomResponse(
        200,
        'Check approval updated successfully',
        check,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= PRINT & DOWNLOAD =================
  async printDownload(id: string, dto: PrintDownloadDto, companyId: string) {
    try {
      const check = await this.checkModel.findOneAndUpdate(
        { _id: id, companyId: new Types.ObjectId(companyId) },
        {
          $set: {
            printed: true,
            pdfDownloaded: true,
            printSettings: dto.printSettings,
            pdfUrl: `https://server.com/checks/${id}.pdf`,
            companyId: new Types.ObjectId(companyId), 
          },
        },
        { new: true },
      );

      if (!check) {
        throw new CustomError(404, 'Check not found');
      }

      return new CustomResponse(
        200,
        'Check print & download updated successfully',
        check,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND ALL =================
  async findAll(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const checks = await this.checkModel.find({
        companyId: new Types.ObjectId(companyId),
      });

      return new CustomResponse(
        200,
        'Checks fetched successfully',
        checks,
      );
    } catch (error) {
      throwException(error);
    }
  }

  // ================= FIND ONE =================
  async findOne(id: string, companyId: string) {
    try {
      const check = await this.checkModel.findOne({
        _id: id,
        companyId: new Types.ObjectId(companyId),
      });

      if (!check) {
        throw new CustomError(404, 'Check not found');
      }

      return new CustomResponse(
        200,
        'Check fetched successfully',
        check,
      );
    } catch (error) {
      throwException(error);
    }
  }
}
``