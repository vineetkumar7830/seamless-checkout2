import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CompanyLimitsService } from './company-limits.service';
import { CreateCompanyLimitDto } from './dto/create-company-limit.dto';
import { UpdateCompanyLimitDto } from './dto/update-company-limit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('company-limits')
@UseGuards(JwtAuthGuard)
export class CompanyLimitsController {
  constructor(private readonly service: CompanyLimitsService) { }

  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreateCompanyLimitDto) {
    return this.service.create({ ...dto, companyId });
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.service.findByCompany(companyId);
  }

  @Get('my-limits')
  getMyLimits(@GetUser('companyId') companyId: string) {
    return this.service.findByCompany(companyId);
  }

  @Patch('my-limits')
  updateMyLimits(
    @GetUser('companyId') companyId: string,
    @Body() dto: UpdateCompanyLimitDto,
  ) {
    return this.service.update(companyId, dto);
  }
}
