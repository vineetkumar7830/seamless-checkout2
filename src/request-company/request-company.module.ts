import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  RequestCompany,
  RequestCompanySchema,
} from './entities/request-company.entity';

import { RequestCompanyController } from './request-company.controller';
import { RequestCompanyService } from './request-company.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestCompany.name, schema: RequestCompanySchema },
    ]),
  ],
  controllers: [RequestCompanyController],
  providers: [RequestCompanyService],
})
export class RequestCompanyModule { }