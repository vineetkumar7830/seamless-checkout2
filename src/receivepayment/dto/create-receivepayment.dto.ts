// src/receivepayment/dto/create-receivepayment.dto.ts

import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEmail,
  Min,
} from 'class-validator';

import { ReceiveFromType } from '../entities/receivepayment.entity';

export class CreateReceivePaymentDto {
  @IsEnum(ReceiveFromType)
  receiveFrom: ReceiveFromType;

  @IsOptional()
  @IsMongoId()
  payeeId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsMongoId()
  walletId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  memo: string;

  @IsOptional()
  @IsBoolean()
  editable?: boolean;

  @IsOptional()
  @IsBoolean()
  recurring?: boolean;
}