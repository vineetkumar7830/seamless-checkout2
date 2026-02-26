import { PartialType } from '@nestjs/mapped-types';
import { CreateFundWalletDto } from './create-fund-wallet.dto';

export class UpdateFundWalletDto extends PartialType(CreateFundWalletDto) {}
