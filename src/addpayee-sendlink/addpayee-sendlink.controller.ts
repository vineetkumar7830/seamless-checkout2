import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AddPayeeSendLinkService } from './addpayee-sendlink.service';
import { CreateSendLinkDto } from './dto/create-addpayee-sendlink.dto';
import { UpdateSendLinkStatusDto } from './dto/update-addpayee-sendlink.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('addpayee-sendlink')
@UseGuards(JwtAuthGuard)
export class AddPayeeSendLinkController {
  constructor(private readonly service: AddPayeeSendLinkService) { }

  // ✅ SEND LINK (CREATE)
  @Post('send')
  send(@GetUser('companyId') companyId: string, @Body() dto: CreateSendLinkDto) {
    return this.service.send(dto, companyId);
  }

  // ✅ LIST
  @Get('list')
  list(@GetUser('companyId') companyId: string) {
    return this.service.list(companyId);
  }

  // ✅ GET ONE
  @Get(':id')
  getOne(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.getOne(id, companyId);
  }

  // ✅ UPDATE
  @Put(':id')
  update(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: UpdateSendLinkStatusDto,
  ) {
    return this.service.update(id, dto, companyId);
  }

  // ✅ DELETE
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string) {
    return this.service.remove(id, companyId);
  }
}
