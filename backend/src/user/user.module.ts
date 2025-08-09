import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { PasswordHasher } from '../common/password-hasher';

@Module({
  providers: [UserService, PasswordHasher],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService]
})
export class UserModule {}
