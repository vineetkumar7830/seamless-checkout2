import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('api/profile')
@UseGuards(JwtAuthGuard) // 🔐 token required
export class UserProfileController {
  constructor(private readonly service: UserProfileService) { }

  // ✅ CREATE PROFILE (after register)
  @Post()
  create(
    @GetUser('userId') userId: string,
    @GetUser('companyId') companyId: string,
    @GetUser('email') email: string,
    @Body() dto: CreateUserProfileDto,
  ) {
    return this.service.create({
      ...dto,
      userId,
      companyId,
      email,
    });
  }

  @Get('me')
  getMyProfile(
    @GetUser('userId') userId: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.service.findByUserAndCompany(userId, companyId);
  }

  @Put('me')
  updateMyProfile(
    @GetUser('userId') userId: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: UpdateUserProfileDto,
  ) {
    return this.service.updateByUserAndCompany(
      userId,
      companyId,
      dto,
    );
  }
}
