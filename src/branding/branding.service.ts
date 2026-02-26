import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Branding, BrandingDocument } from './entities/branding.entity';
import { SaveBrandingDto } from './dto/save-branding.dto';

import { throwException } from '../util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class BrandingService {
  constructor(
    @InjectModel(Branding.name)
    private readonly brandingModel: Model<BrandingDocument>,
  ) { }

  async saveBranding(dto: SaveBrandingDto, companyId: string, logo?: Express.Multer.File) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const updateData: any = {
        ...dto,
        companyId: new Types.ObjectId(companyId),
      };

      if (logo) {
        const baseUrl = process.env.BASE_URL || 'http://localhost:9000';
        updateData.logoUrl = `${baseUrl}/uploads/${logo.filename}`;
      }

      const branding = await this.brandingModel.findOneAndUpdate(
        { companyId: new Types.ObjectId(companyId) },
        updateData,
        { upsert: true, new: true },
      );

      return new CustomResponse(
        200,
        'Branding saved successfully',
        branding,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async getBranding(companyId: string) {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      const branding = await this.brandingModel.findOne({
        companyId: new Types.ObjectId(companyId),
      });

      if (!branding) {
        throw new CustomError(404, 'Branding not found');
      }

      return new CustomResponse(
        200,
        'Branding fetched successfully',
        branding,
      );
    } catch (error) {
      throwException(error);
    }
  }

  async applyBranding(companyId: string, type: 'check' | 'invoice') {
    try {
      if (!companyId) {
        throw new CustomError(401, 'Company context missing. Please relogin.');
      }
      if (!['check', 'invoice'].includes(type)) {
        throw new CustomError(400, 'Type must be check or invoice');
      }

      const branding = await this.brandingModel.findOne({
        companyId: new Types.ObjectId(companyId),
      });

      if (!branding) {
        throw new CustomError(404, 'Branding not found');
      }

      return new CustomResponse(
        200,
        `Branding applied to ${type}`,
        {
          logoUrl: branding.logoUrl,
          colors: {
            primary: branding.primaryColor,
            secondary: branding.secondaryColor,
            accent: branding.accentColor,
          },
          template:
            type === 'check'
              ? branding.defaultCheckTemplate
              : branding.defaultInvoiceTemplate,
        },
      );
    } catch (error) {
      throwException(error);
    }
  }
}
