import {
  Controller, Post, Get, Put, Delete,
  Body, Param, UploadedFile, UseInterceptors, UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { BankAddService } from './bank-add.service';
import { CreateBankDto } from './dto/create-bank-add.dto';
import { UpdateBankDto } from './dto/update-bank-add.dto';

@Controller('bank-add')
@UseGuards(JwtAuthGuard)
export class BankAddController {
  constructor(
    private readonly service: BankAddService,
    private readonly configService: ConfigService,
  ) { }

  // ================= CREATE =================
  @Post()
  @UseInterceptors(
    FileInterceptor('signature', {
      storage: diskStorage({
        destination: './uploads/signature',
        filename: (req, file, cb) => {
          const filename = Date.now() + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreateBankDto,
    @GetUser('companyId') companyId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const baseUrl = this.configService.get<string>('BASE_URL');

    const signatureUrl = file
      ? `${baseUrl}/uploads/signature/${file.filename}`
      : null;

    return this.service.create({
      ...dto,
      signatureUrl,
    }, companyId);
  }

  // ================= READ ALL =================
  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  // ================= READ ONE =================
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.findOne(id, companyId);
  }

  // ================= UPDATE =================
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('signature', {
      storage: diskStorage({
        destination: './uploads/signature',
        filename: (req, file, cb) => {
          const filename = Date.now() + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBankDto,
    @GetUser('companyId') companyId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const baseUrl = this.configService.get<string>('BASE_URL');

    const signatureUrl = file
      ? `${baseUrl}/uploads/signature/${file.filename}`
      : undefined;

    return this.service.update(id, {
      ...dto,
      ...(signatureUrl && { signatureUrl }),
    }, companyId);
  }

  // ================= DELETE =================
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.remove(id, companyId);
  }
}
