import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentReceivedDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentReceivedDto  ) {}
