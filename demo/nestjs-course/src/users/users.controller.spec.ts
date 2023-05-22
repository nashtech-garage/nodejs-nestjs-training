import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    const result: IUser = {
      username: 'ThanhDo',
      email: 'thanh.do@gmail.com',
      password: 'password',
      firstName: 'Thanh',
      lastName: 'Do',
      role: 'User',
      id: '1',
    };
    const createUser = {
      username: 'ThanhDo',
      email: 'thanh.do@gmail.com',
      password: 'password',
      firstName: 'Thanh',
      lastName: 'Do',
      role: 'User',
    };

    const createService = jest
      .spyOn(service, 'create')
      .mockImplementation(async () => result);

    await controller.create(createUser);
    expect(createService).toBeCalled();
  });
});
