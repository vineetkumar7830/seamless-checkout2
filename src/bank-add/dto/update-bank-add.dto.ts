import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDto } from './create-bank-add.dto';

export class UpdateBankDto extends PartialType(CreateBankDto) {}
