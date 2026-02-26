import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { SendInvoiceDto } from './dto/send-invoice.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

const logoMulterConfig = {
  storage: diskStorage({
    destination: './uploads/invoice',
    filename: (_, file, cb) => {
      cb(null, Date.now() + extname(file.originalname));
    },
  }),
};

const attachmentMulterConfig = {
  storage: diskStorage({
    destination: './uploads/invoice/attachments',
    filename: (_, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
};

@UseGuards(JwtAuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) { }

  // ================= CREATE =================
  @Post()
  @UseInterceptors(FileInterceptor('logo', logoMulterConfig))
  create(
    @Body() body: any,
    @UploadedFile() logo: Express.Multer.File,
    @GetUser('companyId') companyId: string,
  ) {
    if (body.items && typeof body.items === 'string') {
      body.items = JSON.parse(body.items);
    }

    return this.service.create(
      body as CreateInvoiceDto,
      companyId,
      logo,
    );
  }

  @Post('send')
  send(@Body() dto: SendInvoiceDto) {
    return this.service.sendInvoice(dto);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.findOne(id, companyId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: Partial<CreateInvoiceDto>,
  ) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.remove(id, companyId);
  }

  @Post(':id/attachments')
  @UseInterceptors(
    FilesInterceptor('files', 10, attachmentMulterConfig),
  )
  addAttachments(
    @Param('id') invoiceId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.addAttachments(invoiceId, files);
  }

  @Get(':id/attachments')
  getAttachments(@Param('id') invoiceId: string) {
    return this.service.getAttachments(invoiceId);
  }

  @Delete('attachments/:attachmentId')
  removeAttachment(@Param('attachmentId') id: string) {
    return this.service.removeAttachment(id);
  }
}
