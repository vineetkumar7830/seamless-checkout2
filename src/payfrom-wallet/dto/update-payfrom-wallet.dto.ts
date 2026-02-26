import { IsIn } from 'class-validator';

export class UpdateWalletPayStatusDto {
  @IsIn(['confirmed', 'completed'])
  status: string;
}
