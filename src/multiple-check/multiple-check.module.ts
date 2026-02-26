import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MultipleCheck,
  MultipleCheckSchema,
} from './entities/multiple-check.entity';
import { MultipleCheckService } from './multiple-check.service';
import { MultipleCheckController } from './multiple-check.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MultipleCheck.name, schema: MultipleCheckSchema },
    ]),
  ],
  controllers: [MultipleCheckController],
  providers: [MultipleCheckService],
})
export class MultipleCheckModule {}