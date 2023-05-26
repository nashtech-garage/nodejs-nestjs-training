import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { UsersService } from './users.service';
import { RegisterUserDto, CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RegisterUserPipe } from './pipes/register-user.pipe';
import { UserEntity } from './entities/user.entity';
import { Roles } from 'src/core/utils/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async register(
    @Body(RegisterUserPipe) registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    this.logger.log('Register');
    return this.usersService.create(registerUserDto);
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @Roles(Role.admin, Role.blogger)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    this.logger.log('Create New User');
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Roles(Role.reader, Role.admin, Role.blogger)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findAll(): Promise<UserEntity[]> {
    this.logger.log('Find All');
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @Roles(Role.reader, Role.blogger)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    this.logger.log('Find One');
    const user: UserEntity = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }
    return user;
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    this.logger.log('Update User');
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    this.logger.log('Remove User');
    return this.usersService.remove(id);
  }

  @Post('ThrowError')
  @ApiBearerAuth()
  async error(): Promise<UserEntity> {
    throw Error('this is Error');
  }
}
