import {
  Controller,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { CompanyManagementService } from './company-management.service';
import { UpdateCompanyDto } from './dto/update-company-management.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyManagementController {

  constructor(private service: CompanyManagementService) {}

  // GET ALL COMPANIES
  @Get()
  findAll(@Req() req) {
    return this.service.findAll(req.user.userId);
  }

  // GET SINGLE COMPANY
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.service.findOne(id, req.user.userId);
  }

  // UPDATE COMPANY + LOGO
  @Put(':id')
  @UseInterceptors(FileInterceptor('logo'))
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() dto: UpdateCompanyDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {

    const logo = file ? file.filename : undefined;

    return this.service.update(id, req.user.userId, dto, logo);
  }

  // DELETE COMPANY
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.service.remove(id, req.user.userId);
  }
}