import { PartialType } from '@nestjs/swagger';
import { CreateBankAccountDto } from './create-add-new-bank-account.dto';

export class UpdateAddNewBankAccountDto extends PartialType(CreateBankAccountDto) {}
