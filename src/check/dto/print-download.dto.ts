import { IsString } from 'class-validator';

export class PrintDownloadDto {
  @IsString()
  printSettings: string;
}
