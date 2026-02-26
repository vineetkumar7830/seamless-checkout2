import { PartialType } from '@nestjs/swagger';
import { CreateReceivePaymentDto } from './create-receivepayment.dto';

export class UpdateReceivepaymentDto extends PartialType(CreateReceivePaymentDto) {}
