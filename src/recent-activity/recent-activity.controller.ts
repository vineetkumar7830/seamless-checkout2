import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RecentActivityService } from './recent-activity.service';
import { CreateRecentActivityDto } from './dto/create-recent-activity.dto';
import { UpdateRecentActivityDto } from './dto/update-recent-activity.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('api/recent-activities')
@UseGuards(JwtAuthGuard)
export class RecentActivityController {
  constructor(private readonly service: RecentActivityService) { }

  @Post()
  create(@GetUser('companyId') companyId: string, @Body() dto: CreateRecentActivityDto) {
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
  update(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: UpdateRecentActivityDto,
  ) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.delete(id, companyId);
  }
}
