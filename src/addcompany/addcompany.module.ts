import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddCompanyController } from './addcompany.controller';
import { AddCompanyService } from './addcompany.service';

import { AddCompany, AddCompanySchema } from './entities/addcompany.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AddCompany.name,
        schema: AddCompanySchema,
      },
    ]),
  ],
  controllers: [AddCompanyController],
  providers: [AddCompanyService],
})
export class AddcompanyModule {}