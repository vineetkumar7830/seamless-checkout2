import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-roles.service';

describe('UserRolesService', () => {
  let service: UserRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleService],
    }).compile();

    service = module.get<UserRoleService>(UserRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
