import {
  Controller,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';

import { CompanyManagementService } from './company-management.service';
import { UpdateCompanyManagementDto } from './dto/update-company-management.dto';
import { CreateCompanyDto } from './dto/create-company-management.dto';

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

  // CREATE COMPANY
  @Post()
  create(@Body() dto: CreateCompanyDto, @Req() req) {
    return this.service.create(req.user.userId, dto);
  }

  // GET SINGLE COMPANY
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.service.findOne(id, req.user.userId);
  }

  // UPDATE COMPANY
  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() dto: UpdateCompanyManagementDto,
  ) {
    return this.service.update(id, req.user.userId, dto);
  }

  // DELETE COMPANY
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.service.remove(id, req.user.userId);
  }
}