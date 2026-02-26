import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';   // ✅ FIXED

import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    return this.userService.findAll(user.companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    return this.userService.findOne(id, user.companyId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ) {
    const user = (req as any).user;
    return this.userService.update(id, dto, user.companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    return this.userService.remove(id, user.companyId);
  }
}