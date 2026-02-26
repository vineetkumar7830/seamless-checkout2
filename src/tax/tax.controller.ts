import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@UseGuards(JwtAuthGuard)
@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  create(@Body() dto: CreateTaxDto, @Req() req: any) {
    return this.taxService.create(dto, req.user.companyId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.taxService.findAll(req.user.companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.taxService.findOne(id, req.user.companyId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaxDto,
    @Req() req: any,
  ) {
    return this.taxService.update(id, dto, req.user.companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.taxService.remove(id, req.user.companyId);
  }
}