import { IsIn, IsString } from 'class-validator';

export class UpdateCreditPayStatusDto {
  @IsIn(['confirmed', 'completed'])
  status: string;
}
