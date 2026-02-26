import { PartialType } from '@nestjs/mapped-types';
import { AddCreditCardDto } from './create-add-credit-card.dto';

export class UpdateAddCreditCardDto extends PartialType(
  AddCreditCardDto,
) {}
