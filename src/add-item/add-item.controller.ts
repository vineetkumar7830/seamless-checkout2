import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddItemService } from './add-item.service';
import { CreateAddItemDto } from './dto/create-add-item.dto';
import { UpdateAddItemDto } from './dto/update-add-item.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('item')
export class AddItemController {
  constructor(private readonly service: AddItemService) { }

  // ================= CREATE =================
  @Post('create')
  create(@Body() dto: CreateAddItemDto, @GetUser('companyId') companyId: string) {
    return this.service.create(dto, companyId);
  }

  // ================= LIST =================
  @Get('list')
  findAll(@GetUser('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  // ================= GET ONE =================
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid item id');
    }
    return this.service.findOne(id, companyId);
  }

  // ================= UPDATE =================
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAddItemDto,
    @GetUser('companyId') companyId: string,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid item id');
    }
    return this.service.update(id, dto, companyId);
  }

  // ================= DELETE =================
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid item id');
    }
    return this.service.remove(id, companyId);
  }
}
