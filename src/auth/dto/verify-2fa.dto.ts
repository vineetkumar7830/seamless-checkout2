import { IsNotEmpty } from 'class-validator';

export class Verify2faDto {
  @IsNotEmpty()
  token: string;
}
