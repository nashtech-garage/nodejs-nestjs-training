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

  constructor(createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
      id: uuidv4(),
    };
  }
}
