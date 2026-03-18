import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

import { NewPaymentService } from './new-payment.service';
import { CreatePaymentDto } from './dto/create-new-payment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('new-payment')
export class NewPaymentController {

  constructor(private service: NewPaymentService){}

  @Post('save')
  create(@Req() req: Request, @Body() dto: CreatePaymentDto){
    const user = req['user'];

    if(!user?.userId || !user?.companyId){
      throw new BadRequestException("Invalid token");
    }

    return this.service.create(user, dto);
  }

  @Post('save-new')
  saveNew(@Req() req: Request, @Body() dto: CreatePaymentDto){
    const user = req['user'];

    if(!user?.userId || !user?.companyId){
      throw new BadRequestException("Invalid token");
    }

    return this.service.saveAndNew(user, dto);
  }

  @Get()
  getAll(@Req() req: Request){
    const user = req['user'];
    return this.service.getAllPayments(user);
  }

  @Get(':id')
  getPayment(@Req() req: Request, @Param('id') id: string){
    const user = req['user'];
    return this.service.getPayment(id, user);
  }

  @Post('remittance/:id')
  addRemittance(@Req() req: Request, @Param('id') id: string, @Body() body){
    const user = req['user'];
    return this.service.addRemittance(id, body, user);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Req() req: Request, @Param('id') id: string, @UploadedFile() file){
    const user = req['user'];
    return this.service.uploadAttachment(id, file, user);
  }

  @Post('add-note/:id')
  addNote(@Req() req: Request, @Param('id') id: string, @Body() body: any){
    const user = req['user'];
    return this.service.addNote(id, body?.note, user);
  }

  @Post('mail-check/:id')
  sendMail(@Req() req: Request, @Param('id') id: string){
    const user = req['user'];
    return this.service.sendMail(id, user);
  }

  @Post('print/:id')
  printCheck(@Req() req: Request, @Param('id') id: string){
    const user = req['user'];
    return this.service.printCheck(id, user);
  }

  @Post('send-ach/:id')
  sendAch(@Req() req: Request, @Param('id') id: string){
    const user = req['user'];
    return this.service.sendACH(id, user);
  }
}