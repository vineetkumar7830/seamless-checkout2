import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'My Awesome Company' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'contact@company.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'https://company.com', required: false })
  @IsOptional()
  website?: string;

  @ApiProperty({ enum: ['USA', 'CANADA'], example: 'USA' })
  @IsIn(['USA', 'CANADA'])
  country: 'USA' | 'CANADA';

  @ApiProperty({ example: 'NY' })
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'New York' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: '123 Main St' })
  @IsNotEmpty()
  addressLine1: string;

  @ApiProperty({ example: 'Suite 456', required: false })
  @IsOptional()
  addressLine2?: string;

  @ApiProperty({ example: '10001' })
  @IsNotEmpty()
  @Matches(/^(\d{5}|[A-Z]\d[A-Z][ -]?\d[A-Z]\d)$/i, {
    message: 'Invalid ZIP / Postal Code for USA or Canada',
  })
  zipCode: string;

  @ApiProperty({ example: 'http://example.com/logo.png', required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({ example: 'http://example.com/signature.png', required: false })
  @IsOptional()
  @IsString()
  signatureUrl?: string;
}
