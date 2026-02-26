import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { PlanService } from './plan.service';
import {
  PurchasePlanDto,
  CreatePlanDto,
  CreateAddOnDto,
} from './dto/plan.dto';

import CustomResponse from 'src/provider/custom-response.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/admin-dashboard/guards/admin.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller()
@UseGuards(JwtAuthGuard)
export class PlanController {
  constructor(private readonly planService: PlanService) { }

  // ================= USER ROUTES =================

  /**
   * GET ALL PLANS & ADDONS (USER)
   */
  @Get('plan')
  getPlans(): Promise<CustomResponse> {
    return this.planService.getPlansAndAddons();
  }

  /**
     * PURCHASE PLAN (USER)
   */
  @Post('plan/purchase')
  purchasePlan(
    @Body() dto: PurchasePlanDto,
    @GetUser('companyId') companyId: string,
  ): Promise<CustomResponse> {
    return this.planService.purchasePlan(dto, companyId);
  }

  // ================= ADMIN ROUTES =================

  /**
   * CREATE PLAN (ADMIN)
   */
  @UseGuards(AdminGuard)
  @Post('admin/plan/create')
  createPlan(
    @Body() dto: CreatePlanDto,
  ): Promise<CustomResponse> {
    return this.planService.createPlan(dto);
  }

  /**
   * UPDATE PLAN (ADMIN)
   */
  @UseGuards(AdminGuard)
  @Put('admin/plan/:planId')
  updatePlan(
    @Param('planId') planId: string,
    @Body() dto: Partial<CreatePlanDto>,
  ): Promise<CustomResponse> {
    return this.planService.updatePlan(planId, dto);
  }

  /**
   * DELETE PLAN (ADMIN)
   */
  @UseGuards(AdminGuard)
  @Delete('admin/plan/:planId')
  deletePlan(
    @Param('planId') planId: string,
  ): Promise<CustomResponse> {
    return this.planService.deletePlan(planId);
  }

  /**
   * CREATE ADDON (ADMIN)
   */
  @UseGuards(AdminGuard)
  @Post('admin/plan/addon')
  createAddon(
    @Body() dto: CreateAddOnDto,
  ): Promise<CustomResponse> {
    return this.planService.createAddon(dto);
  }
}
