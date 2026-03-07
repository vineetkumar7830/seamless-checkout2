import { PartialType } from '@nestjs/swagger';
import { CreateAddCompanyDto } from './create-addcompany.dto';

export class UpdateAddcompanyDto extends PartialType(CreateAddCompanyDto) {}
