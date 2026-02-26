import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PayeeDetailsService } from './payee-details.service';
import { CreatePayeeDetailsDto } from './dto/create-payee-detail.dto';
import { UpdatePayeeDetailsDto } from './dto/update-payee-detail.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('payee-details')
@UseGuards(JwtAuthGuard)
export class PayeeDetailsController {
  constructor(private readonly service: PayeeDetailsService) { }

  // ✅ CREATE
  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreatePayeeDetailsDto) {
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
    @Body() dto: UpdatePayeeDetailsDto,
  ) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.remove(id, companyId);
  }
}
