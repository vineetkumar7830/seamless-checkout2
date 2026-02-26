import { Controller, Post, Patch, Body, Param, Get, UseGuards } from '@nestjs/common';
import { CheckService } from './check.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { TemplateEditorDto } from './dto/template-editor.dto';
import { ApprovalStatusDto } from './dto/approval-status.dto';
import { PrintDownloadDto } from './dto/print-download.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('checks')
@UseGuards(JwtAuthGuard)
export class CheckController {
  constructor(private readonly checkService: CheckService) { }

  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreateCheckDto) {
    return this.checkService.createCheck(dto, companyId);
  }

  @Patch(':id/template')
  updateTemplate(@Param('id') id: string, @GetUser('companyId') companyId: string, @Body() dto: TemplateEditorDto) {
    return this.checkService.updateTemplate(id, dto, companyId);
  }

  @Patch(':id/approval')
  updateApproval(@Param('id') id: string, @GetUser('companyId') companyId: string, @Body() dto: ApprovalStatusDto) {
    return this.checkService.updateApproval(id, dto, companyId);
  }
  
  @Patch(':id/print')
  print(@Param('id') id: string, @GetUser('companyId') companyId: string, @Body() dto: PrintDownloadDto) {
    return this.checkService.printDownload(id, dto, companyId);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.checkService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.checkService.findOne(id, companyId);
  }
}
