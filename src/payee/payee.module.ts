import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payee, PayeeSchema } from './entities/payee.entity';
import { PayeeController } from './payee.controller';
import { PayeeService } from './payee.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payee.name, schema: PayeeSchema }]),
  ],
  controllers: [PayeeController],
  providers: [PayeeService],
})
export class PayeeModule {}
