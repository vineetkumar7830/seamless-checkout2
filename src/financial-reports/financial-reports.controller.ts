import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { FinancialReportsService } from './financial-reports.service';
import { CreateFinancialReportDto } from './dto/create-financial-report.dto';
import { UpdateFinancialReportDto } from './dto/update-financial-report.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('financial-reports')   // ✅ removed extra 'api/'
@UseGuards(JwtAuthGuard)
export class FinancialReportsController {
  constructor(private readonly service: FinancialReportsService) {}

  @Post()
  create(
    @GetUser('companyId') companyId: string,
    @Body() dto: CreateFinancialReportDto,
  ) {
    return this.service.create(dto, companyId);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.service.findOne(id, companyId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: UpdateFinancialReportDto,
  ) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.service.delete(id, companyId);
  }

  // ✅ PDF route fully intact
  @Post(':id/pdf')
  generatePdf(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.service.generatePdf(id, companyId);
  }
}