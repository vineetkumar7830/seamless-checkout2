import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestCompanyDto {

  @ApiProperty({ example: 'boss@employer.com', description: 'Employer email address' })
  @IsEmail()
  YourEmployerEmail: string;

  @ApiProperty({ example: 'boss@employer.com', description: 'Confirm employer email address' })
  @IsEmail()
  ConfirmYourEmployerEmail: string;

  @ApiProperty({ example: 'John Doe', description: 'Employer name' })
  @IsNotEmpty()
  YourEmployerName: string;

  @ApiProperty({ example: 'Johnny', description: 'Employer nickname' })
  @IsNotEmpty()
  YourEmployerNickName: string;

  @ApiProperty({ example: 'Acme Corp', description: 'Requested company name' })
  @IsNotEmpty()
  RequestedCompanyName: string;

}