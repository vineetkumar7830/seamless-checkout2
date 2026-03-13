import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { BlankChecksService } from './blank-checks.service';
import { CreateBlankCheckDto } from './dto/create-blank-check.dto';
import { UpdateBlankCheckDto } from './dto/update-blank-check.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('blank-checks')
@UseGuards(JwtAuthGuard)
export class BlankChecksController {

  constructor(private readonly service: BlankChecksService) {}

  // CREATE
  @Post()
  async create(
    @Body() dto: CreateBlankCheckDto,
    @Req() req,
  ) {
    return this.service.create(dto, req.user);
  }

  // GET ALL
  @Get()
  async findAll(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.findAll(
      req.user,
      Number(page),
      Number(limit),
    );
  }

  // GET SINGLE
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.service.findOne(id, req.user);
  }

  // UPDATE
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBlankCheckDto,
    @Req() req,
  ) {
    return this.service.update(id, dto, req.user);
  }

  // DELETE
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.service.remove(id, req.user);
  }

}