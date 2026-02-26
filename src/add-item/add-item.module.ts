import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddItemController } from './add-item.controller';
import { AddItemService } from './add-item.service';
import { Item, ItemSchema } from './entities/add-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  controllers: [AddItemController],
  providers: [AddItemService],
})
export class AddItemModule {}
