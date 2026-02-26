import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ExportService } from './export-options.service';
import { CreateExportDto } from './dto/create-export-option.dto';
import { UpdateExportDto } from './dto/update-export-option.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/export-options')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly service: ExportService) { }

  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreateExportDto) {
    return this.service.create(dto, companyId);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.service.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.findOne(id, companyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @GetUser('companyId') companyId: string, @Body() dto: UpdateExportDto) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.delete(id, companyId);
  }

  @Get(':id/preview')
  preview(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.preview(id, companyId);
  }
}
