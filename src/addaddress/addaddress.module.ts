import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Addaddress,
  AddaddressSchema,
} from './entities/addaddress.entity';
import { AddaddressService } from './addaddress.service';
import { AddaddressController } from './addaddress.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Addaddress.name,
        schema: AddaddressSchema,
      },
    ]),
  ],
  controllers: [AddaddressController],
  providers: [AddaddressService],
})
export class AddaddressModule {}
