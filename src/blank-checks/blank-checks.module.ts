import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlankChecksController } from './blank-checks.controller';
import { BlankChecksService } from './blank-checks.service';

import { BlankCheck, BlankCheckSchema } from './entities/blank-check.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlankCheck.name, schema: BlankCheckSchema },
    ]),
  ],
  controllers: [BlankChecksController],
  providers: [BlankChecksService],
})
export class BlankChecksModule {}