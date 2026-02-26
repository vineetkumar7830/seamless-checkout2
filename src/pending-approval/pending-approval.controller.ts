import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PendingApprovalService } from './pending-approval.service';
import { CreateApprovalDto } from './dto/create-pending-approval.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('pending-approvals')
@UseGuards(JwtAuthGuard)
export class PendingApprovalController {
  constructor(
    private readonly approvalService: PendingApprovalService,
  ) { }

  @Post()
  create(
    @Body() dto: CreateApprovalDto,
    @GetUser('userId') userId: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.approvalService.create(dto, userId, companyId);
  }

  @Get()
  getPending(@GetUser('companyId') companyId: string) {
    return this.approvalService.getPending(companyId);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.approvalService.getById(id, companyId);
  }

  @Put(':id/action')
  action(
    @Param('id') id: string,
    @Body('status') status: 'approved' | 'rejected',
    @Body('remarks') remarks: string,
    @GetUser('userId') userId: string,
    @GetUser('companyId') companyId: string,
  ) {
    return this.approvalService.action(
      id,
      status,
      userId,
      companyId,
      remarks,
    );
  }
}
