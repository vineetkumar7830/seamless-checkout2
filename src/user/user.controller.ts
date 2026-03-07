import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';

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

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Get all users in the user\'s company' })
  @Get()
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    return this.userService.findAll(user.companyId);
  }

  @ApiOperation({ summary: 'Get a specific user by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    return this.userService.findOne(id, user.companyId);
  }

  @ApiOperation({ summary: 'Update user details' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ) {
    const user = (req as any).user;
    return this.userService.update(id, dto, user.companyId);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    return this.userService.remove(id, user.companyId);
  }
}