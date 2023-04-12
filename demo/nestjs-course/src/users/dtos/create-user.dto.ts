import { IsString, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../common/dtos/base.dto';
import { Expose, Transform } from 'class-transformer';

export class CreateUserDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsNotEmpty()
  @Expose()
  email: string;

  @IsNotEmpty()
  @Expose()
  password: string;

  @IsNotEmpty()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @Expose()
  lastName: string;

  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  @Expose()
  fullName: string;

  @IsNotEmpty()
  @Expose()
  role: string;
}
