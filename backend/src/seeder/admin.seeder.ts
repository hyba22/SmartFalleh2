import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PasswordHasher } from 'src/common/password-hasher';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AdminSeeder implements OnApplicationBootstrap {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async onApplicationBootstrap() {
  
    const admins = await this.userService.findByRole('admin');
    if (admins.length === 0) {
      const hashedPassword = await this.passwordHasher.hash('Admin@123');
      await this.userService.create({
          email: 'admin@example.com',
          password: hashedPassword,
          nom: 'Super',
          prenom: 'Admin',
          role: 'admin',
          telephone: '',
          adresse: '',
          surfaceFerme: 0,
          nbrVaches: 0
      });
      console.log('✅ Admin par défaut créé: admin@example.com / Admin@123');
    }
  }
}
