import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class TemplateEditorDto {

  @IsOptional()
  @IsString()
  layoutSelection: string;

  @IsOptional()
  @IsString()
  logoPlacement: string;

  @IsOptional()
  @IsString()
  fontFamily: string;

  @IsOptional()
  @IsString()
  fontColor: string;

  @IsOptional()
  @IsString()
  backgroundColor: string;

  @IsOptional()
  @IsBoolean()
  saveTemplate: boolean;

  @IsOptional()
  @IsBoolean()
  duplicateTemplate: boolean;
}
 