import { PartialType } from '@nestjs/mapped-types';
import { CreateApprovalDto } from './create-pending-approval.dto';

export class UpdatePendingApprovalDto extends PartialType(CreateApprovalDto) {}
