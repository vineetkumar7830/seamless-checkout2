import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PendingApproval,
  PendingApprovalSchema,
} from './entities/pending-approval.entity';
import { PendingApprovalService } from './pending-approval.service';
import { PendingApprovalController } from './pending-approval.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PendingApproval.name,
        schema: PendingApprovalSchema,
      },
    ]),
  ],

  controllers: [PendingApprovalController],
  providers: [PendingApprovalService],
})
export class PendingApprovalModule {}
