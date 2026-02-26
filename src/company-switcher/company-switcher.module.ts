import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CompanySwitcher,
  CompanySwitcherSchema,
} from './entities/company-switcher.entity';

import { CompanySwitcherService } from './company-switcher.service';
import { CompanySwitcherController } from './company-switcher.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanySwitcher.name, schema: CompanySwitcherSchema },
    ]),
  ],
  controllers: [CompanySwitcherController],
  providers: [CompanySwitcherService],
  exports: [CompanySwitcherService],
})
export class CompanySwitcherModule {}
