import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddCreditCardService } from './add-credit-card.service';
import { AddCreditCardDto } from './dto/create-add-credit-card.dto';

@Controller('add-credit-card')
@UseGuards(JwtAuthGuard)
export class AddCreditCardController {
  constructor(
    private readonly cardService: AddCreditCardService,
  ) {}

  // ✅ ADD CARD
  @Post()
  addCreditCard(@Body() dto: AddCreditCardDto, @Req() req: any) {
    return this.cardService.addCard(
      dto,
      req.user.companyId,
      req.user.userId,
    );
  }

  // ✅ GET ALL
  @Get()
  getAllCards(@Req() req: any) {
    return this.cardService.getAllCards(req.user.companyId);
  }
}