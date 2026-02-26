import { Controller, Post, Get, Body, Param, Put, UseGuards } from '@nestjs/common';
import { CheckIssuedService } from './check-issued.service';
import { CreateCheckIssuedDto } from './dto/create-check-issued.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('checks-issued')
@UseGuards(JwtAuthGuard)
export class CheckIssuedController {
  constructor(
    private readonly checkService: CheckIssuedService,
  ) { }

  @Post()
  create(@Body() dto: CreateCheckIssuedDto, @GetUser('userId') userId: string, @GetUser('companyId') companyId: string) {
    return this.checkService.issueCheck(dto, userId, companyId);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string) {
    return this.checkService.getIssuedChecks(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.checkService.getCheckById(id, companyId);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.checkService.updateStatus(id, status, companyId);
  }
}
