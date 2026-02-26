import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InternationalBankService } from './international-bank.service';
import { CreateInternationalBankDto } from './dto/create-international-bank.dto';
import { UpdateInternationalBankDto } from './dto/update-international-bank.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/international-bank')
@UseGuards(JwtAuthGuard)
export class InternationalBankController {
  constructor(private readonly service: InternationalBankService) { }

  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreateInternationalBankDto) {
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: UpdateInternationalBankDto,
  ) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.remove(id, companyId);
  }
}
