import { PartialType } from '@nestjs/swagger';
import { CreateDepositSlipDto } from './create-deposit-slip.dto';

export class UpdateDepositSlipDto extends PartialType(CreateDepositSlipDto) {}
