import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // ================= CREATE COMPANY =================
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'signature', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/company',
          filename: (req, file, cb) => {
            const uniqueName =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueName + extname(file.originalname));
          },
        }),
      },
    ),
  )
  create(
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      signature?: Express.Multer.File[];
    },
    @Body() dto: CreateCompanyDto,
    @GetUser('userId') userId: string,
  ) {
    return this.companyService.create(dto, files, userId);
  }

  // ================= GET ALL (FILTERED BY TOKEN USER) =================
  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.companyService.findAll(userId);
  }

  // ================= GET ACTIVE COMPANY =================
  @Get('active')
  getActiveCompany(@GetUser('companyId') companyId: string) {
    return this.companyService.getActiveCompany(companyId);
  }

  // ================= GET ONE =================
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
  ) {
    return this.companyService.findOne(id, userId);
  }

  // ================= UPDATE =================
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
    @GetUser('userId') userId: string,
  ) {
    return this.companyService.update(id, dto, userId);
  }

  // ================= DELETE =================
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
  ) {
    return this.companyService.remove(id, userId);
  }

  // ================= SWITCH COMPANY =================
  @Put('switch/:id')
  switchCompany(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
  ) {
    return this.companyService.switchCompany(id, userId);
  }
}
