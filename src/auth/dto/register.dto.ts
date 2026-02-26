import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsBoolean, IsOptional, IsString, IsIn, Matches } from 'class-validator';
import { UserRole } from '../../user/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  confirmPassword: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsBoolean()
  acceptTerms?: boolean;
}
