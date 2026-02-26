import { PartialType } from '@nestjs/mapped-types';
import { CreateAddaddressDto } from './create-addaddress.dto';

export class UpdateAddaddressDto extends PartialType(
  CreateAddaddressDto,
) {}
