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

export interface AuthResponse extends UserResponse {
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
            ...user, 
            access_token: token 
        };
    }

    async signup(signupDto: SignupDto): Promise<AuthResponse> {
        console.log('[AuthService] Starting signup for:', signupDto.email);
        
        // Check if user already exists
        const existingUser = await this.userService.findByEmail(signupDto.email);
        if (existingUser) {
            console.log(`[AuthService] Signup failed - email already in use: ${signupDto.email}`);
            throw new UnauthorizedException('Email already in use');
        }

        // Create the user - password will be hashed in UserService.create()
        const { password, ...restOfSignupDto } = signupDto;
        const newUser = await this.userService.create({
            ...restOfSignupDto,
            password: signupDto.password, // Pass the plain password, it will be hashed in UserService
            region: signupDto.region || '',
            surfaceFerme: signupDto.surfaceFerme ? Number(signupDto.surfaceFerme) : 0,
            nbrVaches: signupDto.nbrVaches ? Number(signupDto.nbrVaches) : 0,
        });

        console.log(`[AuthService] User created successfully: ${newUser.email}`);
        
        // Generate token for the new user
        const userResponse = this.toUserResponse(newUser);
        const token = this.generateToken(userResponse);
        
        return { 
            ...userResponse,
            access_token: token 
        } as AuthResponse;
    }

    private generateToken(user: UserResponse): string {
        const { id, ...userData } = user;
        const payload = {
            sub: id,
            ...userData
        };
        return this.jwtService.sign(payload);
    }
}
