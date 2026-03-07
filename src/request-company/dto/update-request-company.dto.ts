import { PartialType } from '@nestjs/swagger';
import { CreateRequestCompanyDto } from './create-request-company.dto';

export class UpdateRequestCompanyDto extends PartialType(CreateRequestCompanyDto) {}
