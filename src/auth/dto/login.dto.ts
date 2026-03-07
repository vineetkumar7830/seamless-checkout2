import { IsEmail, IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    example: { payeeId: '123', payeeName: 'Jane', payeeEmail: 'jane@example.com' },
    required: false
  })
  @IsOptional()
  @IsObject()
  payee?: {
    payeeId: string;
    payeeName: string;
    payeeEmail: string;
  };
}
