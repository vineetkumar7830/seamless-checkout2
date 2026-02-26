import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { MailDocumentService } from './mail-document.service';
import { CreateMailDto } from './dto/create-mail-document.dto';

@Controller('mail-documents')
@UseGuards(AuthGuard('jwt'))
export class MailDocumentController {

  constructor(private readonly service: MailDocumentService) {}

  @Post()
  async create(@Body() dto: CreateMailDto, @Request() req) {
    return this.service.create(dto, req.user.companyId);
  }

  @Get()
  async findAll(@Request() req) {
    return this.service.findAll(req.user.companyId);
  }

  // ✅ PDF Upload Route
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException('Only PDF files allowed'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 50 * 1024 * 1024,
      },
    }),
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('File is required');
    }

    return {
      message: 'File uploaded successfully',
      fileName: file.filename,
      originalName: file.originalname,
    };
  }
}
