import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddCompanyController } from './addcompany.controller';
import { AddCompanyService } from './addcompany.service';

import { Company, CompanySchema } from '../company-management/entities/company-management.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema,
      },
    ]),
  ],
  controllers: [AddCompanyController],
  providers: [AddCompanyService],
})
export class AddcompanyModule { }