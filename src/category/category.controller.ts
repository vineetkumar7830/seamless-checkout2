import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) { }

  // ================= CREATE =================
  @Post()
  create(@Body() dto: CreateCategoryDto, @GetUser('companyId') companyId: string) {
    return this.service.create(dto, companyId);
  }

  // ================= LIST =================
  @Get()
  findAll(
    @GetUser('companyId') companyId: string,
    @Query('type') type?: string,
  ) {
    return this.service.findAll(companyId, type);
  }

  // ================= GET ONE =================
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category id');
    }

    return this.service.findOne(id, companyId);
  }

  // ================= UPDATE =================
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @GetUser('companyId') companyId: string,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category id');
    }

    return this.service.update(id, dto, companyId);
  }

  // ================= DELETE (SOFT DELETE) =================
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category id');
    }

    return this.service.remove(id, companyId);
  }
}
