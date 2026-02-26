// verification.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { Otp, OtpSchema } from './entities/verification.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
