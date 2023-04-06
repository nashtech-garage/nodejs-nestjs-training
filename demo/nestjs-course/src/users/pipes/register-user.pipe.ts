import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/create-user.dto';
import { HashUtil } from '../../core/utils/hash.util';

@Injectable()
export class RegisterUserPipe
  implements PipeTransform<RegisterUserDto, Promise<RegisterUserDto>>
{
  constructor(private hashUtil: HashUtil) {}
  async transform(
    value: RegisterUserDto,
    _metadata: ArgumentMetadata,
  ): Promise<RegisterUserDto> {
    value.password = await this.hashUtil.hash(value.password);
    return value;
  }
}
