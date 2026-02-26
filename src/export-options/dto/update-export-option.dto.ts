import { PartialType } from '@nestjs/mapped-types';
import { CreateExportDto } from './create-export-option.dto';

export class UpdateExportDto extends PartialType(CreateExportDto) {}
