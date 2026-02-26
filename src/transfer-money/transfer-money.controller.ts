import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TransferMoneyService } from './transfer-money.service';
import { CreateTransferDto } from './dto/create-transfer-money.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('transfer-money')
@UseGuards(JwtAuthGuard)
export class TransferMoneyController {
  constructor(private readonly service: TransferMoneyService) {}

  @Post('transfer')
  transfer(
    @GetUser('companyId') companyId: string,
    @GetUser('userId') userId: string,   // ✅ YE HI SAHI HAI
    @Body() dto: CreateTransferDto,
  ) {
    return this.service.transfer(dto, companyId, userId);
  }

  @Get('list')
  list(@GetUser('companyId') companyId: string) {
    return this.service.list(companyId);
  }
}