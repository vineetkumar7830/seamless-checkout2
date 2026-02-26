import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddPayeeSendLinkController } from './addpayee-sendlink.controller';
import { AddPayeeSendLinkService } from './addpayee-sendlink.service';
import {
  SendLinkPayee,
  SendLinkPayeeSchema,
} from './entities/addpayee-sendlink.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SendLinkPayee.name, schema: SendLinkPayeeSchema },
    ]),
  ],
  controllers: [AddPayeeSendLinkController],
  providers: [AddPayeeSendLinkService],
})
export class AddPayeeSendLinkModule {}
