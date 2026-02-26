import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CheckDraft, CheckDraftDocument } from './entities/check-draft.entity';
import { Remittance, RemittanceDocument } from './entities/remittance.schema';
import { Attachment, AttachmentDocument } from './entities/attachment.schema';
import { Comment, CommentDocument } from './entities/comment.schema';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class CheckDraftService {
  constructor(
    @InjectModel(CheckDraft.name)
    private readonly checkModel: Model<CheckDraftDocument>,

    @InjectModel(Remittance.name)
    private readonly remitModel: Model<RemittanceDocument>,

    @InjectModel(Attachment.name)
    private readonly attachModel: Model<AttachmentDocument>,

    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) { }

  async createCheckDraft(dto: any, user: any) {
    try {
      const companyId = user?.companyId;
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const draft = await this.checkModel.create({
        ...dto,
        companyId: new Types.ObjectId(companyId),
        createdBy: user.userId,
      });

      return new CustomResponse(
        201,
        'Check draft created successfully',
        draft,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async addRemittance(checkDraftId: string, body: any, user: any) {
    try {
      const companyId = user?.companyId;
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const remittance = await this.remitModel.create({
        companyId: new Types.ObjectId(companyId),
        checkDraftId: new Types.ObjectId(checkDraftId),
        invoiceNo: body.invoiceNo,
        item: body.item,
        description: body.description,
        quantity: body.quantity,
        unitCost: body.unitCost,
        total: body.total,
      });

      return new CustomResponse(
        201,
        'Remittance added successfully',
        remittance,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async addAttachment(
    checkDraftId: string,
    file: Express.Multer.File,
    user: any,
  ) {
    try {
      if (!file) {
        throw new CustomError(400, 'File is required');
      }
      const companyId = user?.companyId;
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const baseUrl = process.env.BASE_URL || '';

      const attachment = await this.attachModel.create({
        companyId: new Types.ObjectId(companyId),
        checkDraftId: new Types.ObjectId(checkDraftId),
        fileName: file.originalname,
        fileUrl: `${baseUrl}/${file.path.replace(/\\/g, '/')}`,
        mimeType: file.mimetype,
        fileSize: file.size,
        uploadedBy: user.userId,
      });

      return new CustomResponse(
        201,
        'Attachment uploaded successfully',
        attachment,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async addComment(checkDraftId: string, body: any, user: any) {
    try {
      const companyId = user?.companyId;
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const comment = await this.commentModel.create({
        companyId: new Types.ObjectId(companyId),
        checkDraftId: new Types.ObjectId(checkDraftId),
        comment: body.comment,
        user: new Types.ObjectId(user.userId),
      });

      return new CustomResponse(
        201,
        'Comment added successfully',
        comment,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async importFromExcel(
    file: Express.Multer.File,
    body: any,
    user: any,
  ) {
    try {
      if (!file) {
        throw new CustomError(400, 'Import file is required');
      }
      const companyId = user?.companyId;
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }

      const baseUrl = process.env.BASE_URL || '';

      return new CustomResponse(
        200,
        'Check draft imported successfully',
        {
          companyId: new Types.ObjectId(companyId),
          bankAccountId: body.bankAccountId,
          includeHeader: body.includeHeader,
          originalFileName: file.originalname,
          fileUrl: `${baseUrl}/${file.path.replace(/\\/g, '/')}`,
          fileSize: file.size,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }
}
