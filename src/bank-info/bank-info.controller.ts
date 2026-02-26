import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BankInfoService } from './bank-info.service';
import { CreateBankInfoDto } from './dto/create-bank-info.dto';
import { UpdateBankInfoDto } from './dto/update-bank-info.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('api/bank-info')
@UseGuards(JwtAuthGuard)
export class BankInfoController {
  constructor(private readonly service: BankInfoService) { }

  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreateBankInfoDto) {
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
  update(@Param('id') id: string, @GetUser('companyId') companyId: string, @Body() dto: UpdateBankInfoDto) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.delete(id, companyId);
  }
}
