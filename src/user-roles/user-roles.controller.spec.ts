import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from './user-roles.controller';
import { UserRoleService } from './user-roles.service';

describe('UserRolesController', () => {
  let controller: UserRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleController],
      providers: [UserRoleService],
    }).compile();

    controller = module.get<UserRoleController>(UserRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
