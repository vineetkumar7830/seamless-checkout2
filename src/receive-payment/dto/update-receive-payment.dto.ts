import { PartialType } from '@nestjs/swagger';
import { CreateReceivePaymentDto } from './create-receive-payment.dto';

export class UpdateReceivePaymentDto extends PartialType(CreateReceivePaymentDto) {}
