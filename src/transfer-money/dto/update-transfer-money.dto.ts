import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferDto } from './create-transfer-money.dto';

export class UpdateTransferMoneyDto extends PartialType(CreateTransferDto) {}
