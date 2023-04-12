import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDto): Promise<IUser> {
    createUserDTO.id = uuidv4();
    const currentDate = new Date();
    createUserDTO.createdAt = currentDate;
    createUserDTO.updatedAt = currentDate;
    const user: CreateUserDto = plainToInstance(CreateUserDto, createUserDTO, {
      excludeExtraneousValues: true,
    });
    return await this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.usersService.delete(id);
  }
}
