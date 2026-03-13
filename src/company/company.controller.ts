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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('Company')
@ApiBearerAuth('access-token')
@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // ================= CREATE COMPANY =================
  @ApiOperation({ summary: 'Create a new company with logo and signature' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: { type: 'string', format: 'binary' },
        signature: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        website: { type: 'string' },
        country: { type: 'string', enum: ['USA', 'CANADA'] },
        state: { type: 'string' },
        city: { type: 'string' },
        addressLine1: { type: 'string' },
        addressLine2: { type: 'string' },
        zipCode: { type: 'string' },
      },
    },
  })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'signature', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          // ✅ FIXED PATH (Production Safe)
          destination: join(process.cwd(), 'uploads/company'),

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

  // ================= GET ALL =================
  @ApiOperation({ summary: 'Get all companies for the current user' })
  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.companyService.findAll(userId);
  }

  // ================= GET ACTIVE COMPANY =================
  @ApiOperation({ summary: "Get the user's currently active company" })
  @Get('active')
  getActiveCompany(@GetUser('companyId') companyId: string) {
    return this.companyService.getActiveCompany(companyId);
  }

  // ================= GET ONE =================
  @ApiOperation({ summary: 'Get a specific company by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.companyService.findOne(id, userId);
  }

  // ================= UPDATE =================
  @ApiOperation({ summary: 'Update company details' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
    @GetUser('userId') userId: string,
  ) {
    return this.companyService.update(id, dto, userId);
  }

  // ================= DELETE =================
  @ApiOperation({ summary: 'Delete a company' })
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.companyService.remove(id, userId);
  }

  // ================= SWITCH COMPANY =================
  @ApiOperation({ summary: 'Switch current active company' })
  @Put('switch/:id')
  switchCompany(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.companyService.switchCompany(id, userId);
  }
}