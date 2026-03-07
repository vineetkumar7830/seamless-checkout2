import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company-management.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}