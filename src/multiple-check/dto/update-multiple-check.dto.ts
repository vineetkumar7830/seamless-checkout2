import { PartialType } from '@nestjs/swagger';
import { CreateMultipleCheckDto } from './create-multiple-check.dto';

export class UpdateMultipleCheckDto extends PartialType(CreateMultipleCheckDto) {}
