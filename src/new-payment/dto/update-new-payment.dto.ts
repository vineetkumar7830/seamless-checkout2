import { PartialType } from '@nestjs/swagger';
import {CreatePaymentDto } from './create-new-payment.dto';

export class UpdateNewPaymentDto extends PartialType(CreatePaymentDto) {}
