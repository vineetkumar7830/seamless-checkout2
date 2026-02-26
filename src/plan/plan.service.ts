import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SaaSPlan, SaaSPlanDocument } from './entities/plan.schema';
import { SaaSAddOn, SaaSAddOnDocument } from './entities/addon.schema';
import { PurchasePlanDto, CreatePlanDto, CreateAddOnDto } from './dto/plan.dto';
import { Company, CompanyDocument } from '../company/entities/company.entity';

import { throwException } from 'src/util/util/errorhandling';
import CustomError from 'src/provider/customer-error.service';
import CustomResponse from 'src/provider/custom-response.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(SaaSPlan.name)
    private readonly planModel: Model<SaaSPlanDocument>,

    @InjectModel(SaaSAddOn.name)
    private readonly addonModel: Model<SaaSAddOnDocument>,

    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  // ================= USER =================

  async getPlansAndAddons(): Promise<CustomResponse> {
    try {
      const plans = await this.planModel.find().lean();
      const addOns = await this.addonModel.find().lean();

      return new CustomResponse(200, 'Plans & addons fetched', {
        plans,
        addOns,
      });
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async purchasePlan(
    dto: PurchasePlanDto,
    companyId: string,
  ): Promise<CustomResponse> {
    try {
      const plan = await this.planModel.findOne({ id: dto.planId }).lean();
      if (!plan) throw new CustomError(404, 'Plan not found');

      let addons: any[] = [];
      if (dto.addonIds?.length) {
        addons = await this.addonModel
          .find({ id: { $in: dto.addonIds } })
          .lean();

        if (addons.length !== dto.addonIds.length) {
          throw new CustomError(400, 'Invalid addon selected');
        }
      }

      const company = await this.companyModel.findByIdAndUpdate(
        companyId,
        {
          planId: plan.id,
          addonIds: dto.addonIds || [],
          planPurchasedAt: new Date(),
          planStatus: 'ACTIVE',
        },
        { new: true },
      );

      if (!company) throw new CustomError(404, 'Company not found');

      return new CustomResponse(200, 'Plan purchased successfully', {
        plan,
        addons,
      });
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  // ================= ADMIN =================

  async createPlan(dto: CreatePlanDto): Promise<CustomResponse> {
    try {
      const exists = await this.planModel.findOne({ id: dto.id });
      if (exists) throw new CustomError(400, 'Plan already exists');

      const plan = await this.planModel.create(dto);
      return new CustomResponse(201, 'Plan created successfully', plan);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async updatePlan(
    planId: string,
    dto: Partial<CreatePlanDto>,
  ): Promise<CustomResponse> {
    try {
      const plan = await this.planModel.findOneAndUpdate(
        { id: planId },
        dto,
        { new: true },
      );

      if (!plan) throw new CustomError(404, 'Plan not found');

      return new CustomResponse(200, 'Plan updated successfully', plan);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async deletePlan(planId: string): Promise<CustomResponse> {
    try {
      const plan = await this.planModel.findOneAndDelete({ id: planId });

      if (!plan) {
        throw new CustomError(404, 'Plan not found');
      }

      return new CustomResponse(200, 'Plan deleted successfully', {
        planId,
      });
    } catch (error) {
      throwException(error);
      throw error;
    }
  }

  async createAddon(dto: CreateAddOnDto): Promise<CustomResponse> {
    try {
      const exists = await this.addonModel.findOne({ id: dto.id });
      if (exists) throw new CustomError(400, 'Addon already exists');

      const addon = await this.addonModel.create(dto);
      return new CustomResponse(201, 'Addon created successfully', addon);
    } catch (error) {
      throwException(error);
      throw error;
    }
  }
}
