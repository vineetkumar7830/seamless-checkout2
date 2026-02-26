import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddaddressService } from './addaddress.service';
import { CreateAddaddressDto } from './dto/create-addaddress.dto';
import { UpdateAddaddressDto } from './dto/update-addaddress.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('addaddress')
@UseGuards(AuthGuard('jwt'))
export class AddaddressController {
  constructor(
    private readonly addaddressService: AddaddressService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateAddaddressDto,
    @Req() req,
  ) {
    return this.addaddressService.create(
      dto,
      req.user,
    );
  }

  @Get()
  findAll(@Req() req) {
    return this.addaddressService.findAll(
      req.user,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.addaddressService.findOne(
      id,
      req.user,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAddaddressDto,
    @Req() req,
  ) {
    return this.addaddressService.update(
      id,
      dto,
      req.user,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.addaddressService.remove(
      id,
      req.user,
    );
  }
}
