import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { User, UserSchema } from '../user/entities/user.entity';
import { Company, CompanySchema } from '../company/entities/company.entity';
import {
  UserRoleEntity,
  UserRoleSchema,
} from '../user-roles/entities/user-role.entity';
import {
  LoginAudit,
  LoginAuditSchema,
} from './entities/login-audit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Company.name, schema: CompanySchema },
      { name: UserRoleEntity.name, schema: UserRoleSchema },
      { name: LoginAudit.name, schema: LoginAuditSchema },
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
