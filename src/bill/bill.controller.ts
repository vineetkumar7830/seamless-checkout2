import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { AddBillItemDto } from './dto/add-bill-item.dto';
import { AddBillCommentDto } from './dto/add-bill-comment.dto';

@Controller('bill')
@UseGuards(JwtAuthGuard) 
export class BillController {
  constructor(private readonly service: BillService) {}

  @Post('create')
  create(@Body() dto: CreateBillDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }

  @Post('add-item')
  addItem(@Body() dto: AddBillItemDto, @Req() req: any) {
    return this.service.addItem(dto, req.user);
  }

  @Delete('remove-item/:billId/:index')
  removeItem(
    @Param('billId') billId: string,
    @Param('index') index: string,
    @Req() req: any,
  ) {
    if (!Types.ObjectId.isValid(billId)) {
      throw new BadRequestException('Invalid bill id');
    }

    return this.service.removeItem(billId, Number(index), req.user);
  }

  @Post('add-comment')
  addComment(@Body() dto: AddBillCommentDto, @Req() req: any) {
    return this.service.addComment(dto, req.user);
  }

  @Post('upload-attachment/:billId')
  @UseInterceptors(FileInterceptor('file'))
  uploadAttachment(
    @Param('billId') billId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!Types.ObjectId.isValid(billId)) {
      throw new BadRequestException('Invalid bill id');
    }

    return this.service.addAttachment(billId, file, req.user);
  }

  @Post('upload-extract/:billId')
  @UseInterceptors(FileInterceptor('file'))
  uploadExtract(
    @Param('billId') billId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!Types.ObjectId.isValid(billId)) {
      throw new BadRequestException('Invalid bill id');
    }

    return this.service.uploadAndExtract(billId, file, req.user);
  }

  @Get(':id')
  get(@Param('id') id: string, @Req() req: any) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid bill id');
    }

    return this.service.getBill(id, req.user);
  }
}