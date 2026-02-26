import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportController } from './export-options.controller';
import { ExportService } from './export-options.service';
import { ExportOption, ExportOptionSchema } from './entities/export-option.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExportOption.name, schema: ExportOptionSchema },
    ]),
  ],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
