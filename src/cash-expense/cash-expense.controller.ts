import {Controller,Post,Get, Body,Param,Req, UseGuards, UseInterceptors,UploadedFile,} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CashExpenseService } from './cash-expense.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(JwtAuthGuard)
@Controller('cash-expense')
export class CashExpenseController {

  constructor(private readonly service: CashExpenseService) {}

  @Post('cash-account')
  createCashAccount(@Body() dto, @Req() req) {
    return this.service.createCashAccount(dto, req.user.companyId);
  }

  @Get('cash-account')
  getCashAccounts(@Req() req) {
    return this.service.getCashAccounts(req.user.companyId);
  }

  @Post()
  createExpense(@Body() dto, @Req() req) {
    return this.service.createExpense(dto, req.user.companyId);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Req() req) {
    return this.service.getOne(id, req.user.companyId);
  }

  @Post(':id/email')
  sendEmail(@Param('id') id: string, @Req() req) {
    return this.service.sendEmail(id, req.user.companyId);
  }

  @Post(':id/sign')
  signReceipt() {
    return this.service.signReceipt();
  }

  // NEW ROUTES
  @Post(':id/remittance')
  addRemittance(@Param('id') id: string, @Body() body, @Req() req) {
    return this.service.addRemittance(id, body, req.user.companyId);
  }

  @Post(':id/comment')
  addComment(@Param('id') id: string, @Body('comment') comment: string, @Req() req) {
    return this.service.addComment(id, comment, req.user.email, req.user.companyId);
  }

  @Post(':id/attachment')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  addAttachment(@Param('id') id: string, @UploadedFile() file, @Req() req) {
    return this.service.addAttachment(id, file, req.user.email, req.user.companyId);
  }
}
