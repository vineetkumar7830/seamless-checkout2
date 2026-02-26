import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { PayeeService } from './payee.service';
import { CreatePayeeDto } from './dto/create-payee.dto';
import { UpdatePayeeDto } from './dto/update-payee.dto';
import CustomResponse from 'src/provider/custom-response.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Payee')
@Controller('payee')
@UseGuards(JwtAuthGuard)
export class PayeeController {
  constructor(private readonly payeeService: PayeeService) { }

  @Post()
  @ApiBody({ type: CreatePayeeDto })
  create(@GetUser('companyId') companyId: string, @Body() dto: CreatePayeeDto): Promise<CustomResponse> {
    return this.payeeService.create(dto, companyId);
  }

  @Get()
  findAll(@GetUser('companyId') companyId: string): Promise<CustomResponse> {
    return this.payeeService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: string): Promise<CustomResponse> {
    return this.payeeService.findOne(id, companyId);
  }

  @Put(':id')
  @ApiBody({ type: UpdatePayeeDto })
  update(
    @Param('id') id: string,
    @GetUser('companyId') companyId: string,
    @Body() dto: UpdatePayeeDto,
  ): Promise<CustomResponse> {
    return this.payeeService.update(id, dto, companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('companyId') companyId: string): Promise<CustomResponse> {
    return this.payeeService.remove(id, companyId);
  }
}
