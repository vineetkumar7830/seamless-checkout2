import { PartialType } from '@nestjs/swagger';
import { CreatePayeeDetailsDto } from './create-payee-detail.dto';

export class UpdatePayeeDetailsDto extends PartialType(CreatePayeeDetailsDto) {}
