import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../core/database/prisma.module';
import { HashUtil } from '../core/utils/hash.util';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
export const jwtSecret = 'O5ENeLqWNFdC/jOwYBLon01h2X2w9MlMF9xdDPgneGI=';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HashUtil, JwtStrategy],
})
export class AuthModule {}
