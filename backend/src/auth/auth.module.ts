import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordHasher } from '../common/password-hasher';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: 'mySecretKey123',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, PasswordHasher],
  controllers: [AuthController]
})
export class AuthModule {}
