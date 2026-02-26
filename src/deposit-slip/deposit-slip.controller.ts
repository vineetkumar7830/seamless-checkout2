import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DepositSlipService } from './deposit-slip.service';
import { CreateDepositSlipDto } from './dto/create-deposit-slip.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DepositStatus } from './entities/deposit-slip.entity';

@Controller('deposit-slip')
@UseGuards(JwtAuthGuard)
export class DepositSlipController {
  constructor(
    private readonly service: DepositSlipService,
  ) {}

  @Post()
  create(@Req() req, @Body() dto: CreateDepositSlipDto) {
    return this.service.create(req.user.companyId, dto);
  }

  @Get()
  findAll(@Req() req, @Query('status') status?: DepositStatus) {
    return this.service.findAll(req.user.companyId, status);
  }

  @Post(':id/verify')
  verify(@Param('id') id: string, @Req() req) {
    return this.service.verify(id, req.user.companyId, req.user.userId);
  }

  @Post(':id/void')
  void(@Param('id') id: string, @Req() req) {
    return this.service.void(id, req.user.companyId, req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.service.delete(id, req.user.companyId);
  }

  @Get(':id/print')
  print(@Param('id') id: string, @Req() req) {
    return this.service.print(id, req.user.companyId);
  }

  @Post(':id/comment')
  addComment(
    @Param('id') id: string,
    @Req() req,
    @Body('comment') comment: string,
  ) {
    return this.service.addComment(
      id,
      req.user.companyId,
      req.user.userId,
      comment,
    );
  }

  @Post(':id/attachment')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/deposit-slip',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadAttachment(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return this.service.addAttachment(
      id,
      req.user.companyId,
      req.user.userId,
      file,
    );
  }
}
