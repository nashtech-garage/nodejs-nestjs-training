import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashUtil {
  async hash(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, hashedPass: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPass);
  }
}
