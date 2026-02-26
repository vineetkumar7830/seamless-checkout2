import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyLimitsController } from './company-limits.controller';
import { CompanyLimitsService } from './company-limits.service';
import { CompanyLimit, CompanyLimitSchema } from './entities/company-limit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyLimit.name, schema: CompanyLimitSchema },
    ]),
  ],
  
  controllers: [CompanyLimitsController],
  providers: [CompanyLimitsService],
})

export class CompanyLimitsModule {}
