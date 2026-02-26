import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Check, CheckSchema } from './entities/check.entity';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Check.name, schema: CheckSchema }]),
  ],
  controllers: [CheckController],
  providers: [CheckService],
})
export class CheckModule {}
