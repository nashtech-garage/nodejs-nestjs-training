import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dtos';

let users: IUser[] = [
  {
    id: '1',
    username: 'tuancv',
    email: 'tuancv.guru@gmail.com',
    password: 'ahsjfklsahfkashfkas',
    firstName: 'Tuan',
    lastName: 'Can',
    role: 'Admin',
  },
];

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  @Post()
  async create(@Body() createUserDTO: CreateUserDto): Promise<IUser> {
    const user: IUser = {
      ...instanceToPlain(createUserDTO),
      id: uuidv4(),
    } as IUser;
    users.push(user);
    return user;
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return users;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IUser> {
    const user = users.find((user: IUser) => user.id === id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    let updatedUser: IUser = undefined;
    users = users.map((user: IUser) => {
      if (user.id !== id) return user;
      updatedUser = { ...user, ...instanceToPlain(updateUserDto) };
      return updatedUser;
    });
    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    users = users.filter((user: IUser) => user.id !== id);
    return id;
  }
}
