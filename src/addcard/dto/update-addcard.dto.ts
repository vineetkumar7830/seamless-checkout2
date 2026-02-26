import { PartialType } from '@nestjs/swagger';
import { CreateAddcardDto } from './create-addcard.dto';

export class UpdateAddcardDto extends PartialType(CreateAddcardDto) {}
