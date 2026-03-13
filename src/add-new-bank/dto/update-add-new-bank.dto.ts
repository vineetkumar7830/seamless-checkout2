import { PartialType } from '@nestjs/swagger';
import { CreateAddNewBankDto } from './create-add-new-bank.dto';

export class UpdateAddNewBankDto extends PartialType(CreateAddNewBankDto) {}
