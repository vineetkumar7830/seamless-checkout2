import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PaymentLinkService } from './payment-link.service';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { UpdatePaymentLinkDto } from './dto/update-payment-link.dto';

@Controller()
export class PaymentLinkController {
  constructor(private readonly service: PaymentLinkService) { }

  @Post('payment-links')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/logos',
        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @GetUser('companyId') companyId: string,
    @Body() dto: CreatePaymentLinkDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      (dto as any).logo = `/uploads/logos/${file.filename}`;
    }

    return this.service.create(companyId, dto);
  }

  @Get('payment-links')
  @UseGuards(JwtAuthGuard)
  async getAll(@GetUser('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  @Put('payment-links/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/logos',
        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @GetUser('companyId') companyId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePaymentLinkDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      (dto as any).logo = `/uploads/logos/${file.filename}`;
    }

    return this.service.update(companyId, id, dto);
  }

  @Get('pay/:path')
  async publicAccess(@Param('path') path: string) {
    return this.service.getPublic(path);
  }
}
