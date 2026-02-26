import {
  Controller,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CheckDraftService } from './check-draft.service';
import { CreateCheckDraftDto } from './dto/create-check-draft.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('check-draft')
@UseGuards(JwtAuthGuard)
export class CheckDraftController {
  constructor(private readonly service: CheckDraftService) { }

  @Post()
  create(
    @Body() dto: CreateCheckDraftDto,
    @GetUser() user: any,
  ) {
    return this.service.createCheckDraft(dto, user);
  }

  @Post(':id/remittance')
  addRemittance(
    @Param('id') id: string,
    @Body() body: any,
    @GetUser() user: any,
  ) {
    return this.service.addRemittance(id, body, user);
  }

  @Post(':id/attachment')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/attachments',
        filename: (req, file, cb) => {
          const unique =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  upload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any,
  ) {
    return this.service.addAttachment(id, file, user);
  }

  @Post(':id/comment')
  addComment(
    @Param('id') id: string,
    @Body() body: any,
    @GetUser() user: any,
  ) {
    return this.service.addComment(id, body, user);
  }

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/imports',
        filename: (req, file, cb) => {
          const unique =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  importExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @GetUser() user: any,
  ) {
    return this.service.importFromExcel(file, body, user);
  }
}
