import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'P0VlpF86jFLONA9kowSq3WsLVrQ5PHjq1LqF0yrwDq1',
        signOptions: { 
         expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as unknown as number, // cast to string
      }
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService,JwtStrategy,PassportModule],
})
export class AuthModule {}