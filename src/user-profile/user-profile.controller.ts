import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { UserProfileService } from './user-profile.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {

  constructor(private readonly service: UserProfileService) {}

  // GET PROFILE
  @Get('me')
  getMyProfile(
    @GetUser('userId') userId: string,
    @GetUser('email') email: string,
    @GetUser('firstName') firstName: string,
  ) {
    return this.service.findByUser(userId, email, firstName);
  }

  // UPDATE PROFILE
  @Put('me')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  updateMyProfile(
    @GetUser('userId') userId: string,
    @GetUser('email') email: string,
    @GetUser('firstName') firstName: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateUserProfileDto,
  ) {

    if (file) {
      dto.logo = `uploads/profile/${file.filename}`;
    }

    return this.service.updateByUser(
      userId,
      email,
      firstName,
      dto,
    );
  }

  // CHANGE PASSWORD
  @Put('change-password')
  changePassword(
    @GetUser('userId') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.service.changePassword(userId, dto);
  }
}