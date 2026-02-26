import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardStep1Dto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  cardProvider: string;

  @IsString()
  color: string;
}