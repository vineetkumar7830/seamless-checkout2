import { PartialType } from '@nestjs/mapped-types';
import { CreateBlankCheckDto } from './create-blank-check.dto';

export class UpdateBlankCheckDto extends PartialType(CreateBlankCheckDto) {}