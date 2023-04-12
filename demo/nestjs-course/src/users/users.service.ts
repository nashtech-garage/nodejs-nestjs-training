import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  async create(createUserDTO: CreateUserDto): Promise<IUser> {
    const user: IUser = instanceToPlain(createUserDTO) as IUser;
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async findById(id: string): Promise<IUser> {
    return this.users.find((user: IUser) => user.id === id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    let updatedUser: IUser = undefined;
    this.users = this.users.map((user: IUser) => {
      if (user.id !== id) return user;
      updatedUser = { ...user, ...instanceToPlain(updateUserDto) };
      return updatedUser;
    });
    return updatedUser;
  }

  async delete(id: string): Promise<string> {
    this.users = this.users.filter((user: IUser) => user.id !== id);
    return id;
  }
}
