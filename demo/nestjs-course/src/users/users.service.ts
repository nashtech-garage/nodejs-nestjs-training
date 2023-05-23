import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.create({ data: createUserDto });
    return plainToInstance(UserEntity, user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.findMany({});
    return users.map((user: UserEntity) => plainToInstance(UserEntity, user));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findUnique({ id });
    return plainToInstance(UserEntity, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.update({
      where: { id },
      data: updateUserDto,
    });
    return plainToInstance(UserEntity, user);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.delete({ id });
    return plainToInstance(UserEntity, user);
  }
}
