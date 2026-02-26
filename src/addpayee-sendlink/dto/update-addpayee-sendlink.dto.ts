import { IsIn } from 'class-validator';

export class UpdateSendLinkStatusDto {
  @IsIn(['opened', 'completed'])
  status: string;
}
