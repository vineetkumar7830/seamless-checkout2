import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FinancialReport,
  FinancialReportSchema,
} from './entities/financial-report.entity';
import { FinancialReportsController } from './financial-reports.controller';
import { FinancialReportsService } from './financial-reports.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FinancialReport.name, schema: FinancialReportSchema },
    ]),
  ],
  controllers: [FinancialReportsController],
  providers: [FinancialReportsService],
})
export class FinancialReportsModule {}
