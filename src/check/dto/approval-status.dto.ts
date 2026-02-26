import { IsString, IsOptional } from 'class-validator';

export class ApprovalStatusDto {
  @IsString()
  approvalStatus: 'draft' | 'pending' | 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  approvedBy?: string;

  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
