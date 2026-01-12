import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DemandeModule } from './demande/demande.module';
import User from './user/entity/user.entity';
import { AdminSeeder } from './seeder/admin.seeder';
import { PasswordHasher } from './common/password-hasher';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
<<<<<<< HEAD
      port: parseInt(process.env.DB_PORT || '3306', 10),
=======
      port: 3308,
>>>>>>> 35ddaa2 (Modifications backend et frontend terminées)
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User], 
      autoLoadEntities: true,
      synchronize: true,
    }),AuthModule, UserModule, DemandeModule],
  controllers: [AppController],
  providers: [AppService, AdminSeeder, PasswordHasher],
})
export class AppModule {}
