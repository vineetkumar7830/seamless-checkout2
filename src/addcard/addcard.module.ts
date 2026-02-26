import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddCard, AddCardSchema } from './entities/addcard.entity';
import { AddCardService } from './addcard.service';
import { AddCardController } from './addcard.controller';
@Module({
  
})
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddCard.name, schema: AddCardSchema },
    ]),
  ],
  controllers: [AddCardController],
  providers: [AddCardService],
})
export class AddCardModule {}