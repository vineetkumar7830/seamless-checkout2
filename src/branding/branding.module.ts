import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandingService } from './branding.service';
import { BrandingController } from './branding.controller';
import { Branding, BrandingSchema } from './entities/branding.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Branding.name, schema: BrandingSchema },
    ]),
  ],
  controllers: [BrandingController],
  providers: [BrandingService],
})
export class BrandingModule {  }
