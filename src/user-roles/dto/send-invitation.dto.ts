import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export enum UserType {
    USER = 'Add User',
    ACCOUNTANT = 'Add Your Accountant',
    CLERK = 'Add Clerk',
    APPROVER = 'Add Approver',
}

export class SendInvitationDto {
    @IsEnum(UserType)
    userType: UserType;

    @IsEmail()
    userEmail: string;

    @IsEmail()
    confirmUserEmail: string;

    @IsString()
    fullLegalName: string;

    @IsString()
    nickName: string;

    @IsOptional()
    @IsString()
    preferredCompanyName?: string; // Auto-filled from logged-in user's company

    @IsOptional()
    @IsString()
    companyId?: string; // Will be extracted from JWT token
}
