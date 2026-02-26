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
import { MultipleCheckService } from './multiple-check.service';
import { CreateMultipleCheckDto } from './dto/create-multiple-check.dto';

@UseGuards(JwtAuthGuard)
@Controller('multiple-check')
export class MultipleCheckController {
  constructor(private readonly service: MultipleCheckService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateMultipleCheckDto) {
    const userId = req.user.userId || req.user._id;
    return this.service.create(userId, dto);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.userId || req.user._id;
    return this.service.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId || req.user._id;
    return this.service.findOne(userId, id);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId || req.user._id;
    return this.service.delete(userId, id);
  }
}