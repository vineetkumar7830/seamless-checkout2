import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Company, CompanySchema } from './entities/company.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

import { User, UserSchema } from '../user/entities/user.entity';

import { SaaSPlan, SaaSPlanSchema } from '../plan/entities/plan.schema';
import { SaaSAddOn, SaaSAddOnSchema } from '../plan/entities/addon.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },

      // ✅ ADD THESE TWO (VERY IMPORTANT)
      { name: SaaSPlan.name, schema: SaaSPlanSchema },
      { name: SaaSAddOn.name, schema: SaaSAddOnSchema },
    ]),
    AuthModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule { }
