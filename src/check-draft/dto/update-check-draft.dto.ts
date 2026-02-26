import { PartialType } from '@nestjs/swagger';
import { CreateCheckDraftDto } from './create-check-draft.dto';

export class UpdateCheckDraftDto extends PartialType(CreateCheckDraftDto) {}
