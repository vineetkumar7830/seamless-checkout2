import { PartialType } from '@nestjs/mapped-types';
import { CreateBankInfoDto } from './create-bank-info.dto';

export class UpdateBankInfoDto extends PartialType(CreateBankInfoDto) {}
