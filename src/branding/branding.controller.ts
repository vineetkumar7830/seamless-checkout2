import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BrandingService } from './branding.service';
import { SaveBrandingDto } from './dto/save-branding.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('branding')
@UseGuards(JwtAuthGuard)
export class BrandingController {
  constructor(private readonly service: BrandingService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  
  saveBranding(
    @UploadedFile() logo: Express.Multer.File,
    @Body() dto: SaveBrandingDto,
    @GetUser('companyId') companyId: string,
  ) {
    return this.service.saveBranding(dto, companyId, logo);
  }
  
  @Get()
  getMyBranding(@GetUser('companyId') companyId: string) {
    return this.service.getBranding(companyId);
  }
  @Get()
  @Get('apply/:type')
  applyBranding(
    @GetUser('companyId') companyId: string,
    @Param('type') type: 'check' | 'invoice',
  ) {
    return this.service.applyBranding(companyId, type);
  }
}
