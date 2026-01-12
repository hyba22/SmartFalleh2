import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PasswordHasher } from '../common/password-hasher';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import User from '../user/entity/user.entity';
import { TokenBlacklistService } from './token-blacklist.service';

type UserResponse = {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'agriculteur' | 'jury' | 'responsable';
  nom: string;
  prenom: string;
  telephone: string;
  adresse?: string;
  region?: string;
  surfaceFerme?: number;
  nbrVaches?: number;
};

export interface AuthResponse {
  user: UserResponse;
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklist: TokenBlacklistService, // inject blacklist
  ) {}

  private toUserResponse(user: User): UserResponse {
    const { password, created_at, updated_at, ...userData } = user;
    return {
      ...userData,
      id: user.id.toString(),
      adresse: userData.adresse || undefined,
      region: userData.region || undefined,
      surfaceFerme: userData.surfaceFerme || undefined,
      nbrVaches: userData.nbrVaches,
    };
  }

  private generateToken(user: UserResponse): string {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    if (!email || !password) throw new BadRequestException('Email and password are required');
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const isPasswordValid = await this.passwordHasher.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');
    return this.toUserResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const token = this.generateToken(user);
    return { user, access_token: token };
  }

  async signup(signupDto: SignupDto): Promise<AuthResponse> {
    const existingUser = await this.userService.findByEmail(signupDto.email);
    if (existingUser) throw new UnauthorizedException('Email already in use');

    const hashedPassword = await this.passwordHasher.hash(signupDto.password);
    const userData = {
      email: signupDto.email,
      password: hashedPassword,
      nom: signupDto.nom,
      prenom: signupDto.prenom,
      telephone: signupDto.telephone || '',
      adresse: signupDto.adresse || '',
      role: signupDto.role || 'agriculteur',
      region: signupDto.region || '',
      surfaceFerme: signupDto.surfaceFerme ? Number(signupDto.surfaceFerme) : 0,
      nbrVaches: signupDto.nbrVaches ? Number(signupDto.nbrVaches) : 0,
    };

    const newUser = await this.userService.create(userData as any);
    const userResponse = this.toUserResponse(newUser);
    const token = this.generateToken(userResponse);
    return { user: userResponse, access_token: token };
  }

  /**
   * Logout: add token to blacklist
   */
 logout(token?: string) {
    localStorage.clear();
    sessionStorage.clear();
    // Supprimer cookies si tu en utilises
    document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

}
