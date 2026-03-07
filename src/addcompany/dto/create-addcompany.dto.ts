import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddCompanyDto {

  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  companyName: string;

}