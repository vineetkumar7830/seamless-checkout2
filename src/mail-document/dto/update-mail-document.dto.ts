import { PartialType } from '@nestjs/swagger';
import { CreateMailDto } from './create-mail-document.dto';

export class UpdateMailDocumentDto extends PartialType(CreateMailDto) {}
