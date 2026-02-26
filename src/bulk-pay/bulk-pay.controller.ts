import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BulkPayService } from './bulk-pay.service';
import { CreateBulkPayDto } from './dto/create-bulk-pay.dto';

@UseGuards(JwtAuthGuard)
@Controller('bulk-pay')
export class BulkPayController {
  constructor(private readonly service: BulkPayService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateBulkPayDto) {
    const userId = req.user.userId || req.user._id;
    return this.service.create(userId, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.userId || req.user._id;
    return this.service.findAll(userId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId || req.user._id;
    return this.service.findOne(userId, id);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId || req.user._id;
    return this.service.delete(userId, id);
  }
}