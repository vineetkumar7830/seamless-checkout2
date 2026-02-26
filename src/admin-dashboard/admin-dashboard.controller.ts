import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { UpdateCompanyStatusDto } from './dto/update-company-status.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/dashboard')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminDashboardController {
  constructor(private readonly service: AdminDashboardService) {}

  @Get('summary')
  getDashboardSummary() {
    return this.service.getDashboardSummary();
  }

  @Get('users')
  getAllUsers() {
    return this.service.getAllUsers();
  }
  @Get('companies')
  getAllCompanies() {
    return this.service.getAllCompanies();
  }
  
  @Patch('user/:id/status')
  updateUserStatus(
    @Param('id') id: string,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.service.updateUserStatus(id, dto.isActive);
  }


  @Patch('company/:id/status')
  updateCompanyStatus(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyStatusDto,
  ) {
    return this.service.updateCompanyStatus(id, dto.isActive);
  }
}
