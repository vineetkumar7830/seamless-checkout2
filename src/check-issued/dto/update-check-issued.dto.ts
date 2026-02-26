import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckIssuedDto } from './create-check-issued.dto';

export class UpdateCheckIssuedDto extends PartialType(CreateCheckIssuedDto) {}
