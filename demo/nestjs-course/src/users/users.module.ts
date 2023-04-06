import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaModule } from '../core/database/prisma.module';
import { HashUtil } from '../core/utils/hash.util';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HashUtil],
  exports: [UsersService],
})
export class UsersModule {}
