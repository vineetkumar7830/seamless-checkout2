import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Company, CompanySchema } from './entities/company-management.entity';
import { CompanyManagementController } from './company-management.controller';
import { CompanyManagementService } from './company-management.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [CompanyManagementController],
  providers: [CompanyManagementService],
})
export class CompanyManagementModule {}