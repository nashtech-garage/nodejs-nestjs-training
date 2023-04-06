import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
}

export enum Role {
  Admin = 'admin',
  Reader = 'reader',
  Blogger = 'blogger',
}

export class CreateUserDto extends RegisterUserDto {
  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({ required: false, default: Role.Reader })
  role?: Role;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ required: false, default: [] })
  group_permission?: string[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  is_verify?: boolean;
}
