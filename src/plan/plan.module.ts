import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';

import { SaaSPlan, SaaSPlanSchema } from './entities/plan.schema';
import { SaaSAddOn, SaaSAddOnSchema } from './entities/addon.schema';
import { Company, CompanySchema } from '../company/entities/company.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SaaSPlan.name, schema: SaaSPlanSchema },
      { name: SaaSAddOn.name, schema: SaaSAddOnSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
