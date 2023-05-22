import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { create } from 'domain';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { IUser } from './interfaces/user.interface';

describe('UsersService', () => {
  let service: UsersService;
  let id: string;

  const createUser: CreateUserDto = {
    username: 'ThanhDo',
    email: 'thanh.do@gmail.com',
    password: 'password',
    firstName: 'Thanh',
    lastName: 'Do',
    role: 'User',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {
    const newUser = await service.create(createUser);
    id = newUser.id;

    expect(newUser.username).toEqual(createUser.username);
    expect(newUser.email).toEqual(createUser.email);
    expect(newUser.role).toEqual(createUser.role);
  });

  it('should findAll user', async () => {
    const allUsers = await service.findAll();
    expect(allUsers.length).toEqual(1);
  });

  it('should find by id', async () => {
    const userById = await service.findById(id);
    expect(userById.email).toEqual(createUser.email);
    expect(userById.username).toEqual(createUser.username);
  });

  it('should update user', async () => {
    const updateInfo: UpdateUserDto = {
      email: 'testupdate@gmail.com',
    };
    await service.update(id, updateInfo);
    const updatedUser = await service.findById(id);

    expect(updatedUser.email).toEqual(updateInfo.email);
  });

  it('should delete user', async () => {
    await service.delete(id);
    const findDeletedUser = await service.findById(id);
    expect(findDeletedUser).toBeFalsy();
  });
});
