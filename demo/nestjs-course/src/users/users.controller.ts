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

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async register(
    @Body(RegisterUserPipe) registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    return this.usersService.create(registerUserDto);
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }
    return user;
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.usersService.remove(id);
  }
}
