import { PartialType } from '@nestjs/swagger';
import { CreateBulkPayDto } from './create-bulk-pay.dto';

export class UpdateBulkPayDto extends PartialType(CreateBulkPayDto) {}
