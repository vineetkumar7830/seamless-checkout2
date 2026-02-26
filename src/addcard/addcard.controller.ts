import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { AddCardService } from './addcard.service';
import { CreateCardStep1Dto } from './dto/create-card-step1.dto';
import { CreateCardStep2Dto } from './dto/create-card-step2.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('addcard')
@UseGuards(JwtAuthGuard)
export class AddCardController {
  constructor(private readonly addCardService: AddCardService) {}

  @Post('add-card')
  async addCard(
    @Body() dto: CreateCardStep1Dto,
    @Req() req: Request & { user: any },
  ) {
    return this.addCardService.addCard(dto, req.user);
  }

  @Post('add-credit-card/:cardId')
  async addCreditCard(
    @Param('cardId') cardId: string,
    @Body() dto: CreateCardStep2Dto,
    @Req() req: Request & { user: any },
  ) {
    return this.addCardService.addCreditCard(
      cardId,
      dto,
      req.user,
    );
  }

  @Get('my')
  async getMyCards(
    @Req() req: Request & { user: any },
  ) {
    return this.addCardService.getMyCards(req.user);
  }

  // ✅ UPDATE
  @Patch('update/:cardId')
  async updateCard(
    @Param('cardId') cardId: string,
    @Body() dto: Partial<CreateCardStep1Dto & CreateCardStep2Dto>,
    @Req() req: Request & { user: any },
  ) {
    return this.addCardService.updateCard(
      cardId,
      dto,
      req.user,
    );
  }

  // ✅ DELETE
  @Delete('delete/:cardId')
  async deleteCard(
    @Param('cardId') cardId: string,
    @Req() req: Request & { user: any },
  ) {
    return this.addCardService.deleteCard(
      cardId,
      req.user,
    );
  }
}