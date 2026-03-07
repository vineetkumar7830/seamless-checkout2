import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';

import { AddCompanyService } from './addcompany.service';
import { CreateAddCompanyDto } from './dto/create-addcompany.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('add-company')
export class AddCompanyController {

  constructor(private readonly addCompanyService: AddCompanyService) {}

  // ADD COMPANY
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAddCompanyDto: CreateAddCompanyDto,
    @Request() req: any,
  ) {

    const userId = req.user?.userId;

    return await this.addCompanyService.create(createAddCompanyDto, userId);
  }

  // GET USER COMPANIES
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {

    const userId = req.user?.userId;

    return await this.addCompanyService.findAll(userId);
  }
}