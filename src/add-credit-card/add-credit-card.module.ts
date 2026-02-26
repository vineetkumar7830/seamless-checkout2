import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCreditCardService } from './add-credit-card.service';
import { AddCreditCardController } from './add-credit-card.controller';
import {
  AddCreditCard,
  AddCreditCardSchema,
} from './entities/add-credit-card.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddCreditCard.name, schema: AddCreditCardSchema },
    ]),
  ],
  controllers: [AddCreditCardController],
  providers: [AddCreditCardService],
})
export class AddCreditCardModule {}
