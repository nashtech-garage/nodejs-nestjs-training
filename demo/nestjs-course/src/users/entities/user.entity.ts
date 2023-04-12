import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '../dtos';

export class UserEntity {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
      id: uuidv4(),
    };
  }
}
