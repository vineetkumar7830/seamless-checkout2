import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckIssued,
  CheckIssuedSchema,
} from './entities/check-issued.entity';
import { CheckIssuedService } from './check-issued.service';
import { CheckIssuedController } from './check-issued.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CheckIssued.name, schema: CheckIssuedSchema },
    ]),
  ],

  controllers: [CheckIssuedController],
  providers: [CheckIssuedService],
})
export class CheckIssuedModule {}
