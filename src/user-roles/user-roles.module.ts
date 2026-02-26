import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleController } from './user-roles.controller';
import { UserRoleService } from './user-roles.service';
import { UserRoleEntity, UserRoleSchema } from './entities/user-role.entity';
import { Company, CompanySchema } from '../company/entities/company.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserRoleEntity.name, schema: UserRoleSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
    AuthModule,
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule { }
