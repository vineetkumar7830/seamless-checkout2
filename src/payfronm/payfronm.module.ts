import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayFromController } from './payfronm.controller';
import { PayFromService } from './payfronm.service';
import { PayFrom, PayFromSchema } from './entities/payfronm.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PayFrom.name, schema: PayFromSchema },
    ]),
  ],
  controllers: [PayFromController],
  providers: [PayFromService],
})
export class PayFromModule {}
