import { IsString } from "class-validator";

export class NoteDto {

  @IsString()
  note: string;

}