import { PartialType } from '@nestjs/mapped-types';
import { CreateInternationalBankDto } from './create-international-bank.dto';

export class UpdateInternationalBankDto extends PartialType(
  CreateInternationalBankDto,
) {}
