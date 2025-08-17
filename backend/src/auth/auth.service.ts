import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PasswordHasher } from '../common/password-hasher';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import User from '../user/entity/user.entity';

// Define a type for the user response that converts the ID to string
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
        console.log(`[AuthService] Validating user: ${email}`);
        
        if (!email || !password) {
            console.log('[AuthService] Validation failed: Email and password are required');
            throw new BadRequestException('Email and password are required');
        }

        console.log(`[AuthService] Looking up user with email: ${email}`);
        const user = await this.userService.findByEmail(email);
        if (!user) {
            console.log(`[AuthService] User not found with email: ${email}`);
            throw new UnauthorizedException('Invalid email or password');
        }
        console.log(`[AuthService] User found - ID: ${user.id}, Email: ${user.email}`);

        if (!user.password) {
            console.log(`[AuthService] No password hash found for user: ${email}`);
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log('[AuthService] Comparing provided password with stored hash...');
        const isPasswordValid = await this.passwordHasher.compare(password, user.password);
        
        if (!isPasswordValid) {
            console.log(`[AuthService] Password validation failed for user: ${email}`);
            // For debugging - don't do this in production
            console.log(`[AuthService] Provided password: ${password}`);
            console.log(`[AuthService] Stored hash: ${user.password}`);
            throw new UnauthorizedException('Invalid email or password');
        }

        console.log(`[AuthService] User validated successfully: ${email}`);
        return this.toUserResponse(user);
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const token = this.generateToken(user);
        return { 
            user,
            access_token: token 
        };
    }

    async signup(signupDto: SignupDto): Promise<AuthResponse> {
        // Check if user already exists
        const existingUser = await this.userService.findByEmail(signupDto.email);
        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }

        // Hash the password
        const hashedPassword = await this.passwordHasher.hash(signupDto.password);
        
        // Prepare user data according to CreateUserDto
        const userData = {
            email: signupDto.email,
            password: hashedPassword,
            nom: signupDto.nom,
            prenom: signupDto.prenom,
            telephone: signupDto.telephone || '',
            adresse: signupDto.adresse || '',
            role: signupDto.role || 'agriculteur', // Default role if not specified
            region: signupDto.region || '',
            surfaceFerme: signupDto.surfaceFerme ? Number(signupDto.surfaceFerme) : 0,
            nbrVaches: signupDto.nbrVaches ? Number(signupDto.nbrVaches) : 0,
        };
        
        // Create the user
        const newUser = await this.userService.create(userData as any); // Temporary any to bypass type checking
        const userResponse = this.toUserResponse(newUser);
        
        // Generate token
        const token = this.generateToken(userResponse);
        
        return {
            user: userResponse,
            access_token: token
        };
    }

}
