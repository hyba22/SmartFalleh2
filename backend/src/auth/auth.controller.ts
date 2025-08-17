import { Controller, Post, Body, UseGuards, HttpException, HttpStatus, UnauthorizedException, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiProperty } from '@nestjs/swagger'; 

@ApiTags('auth')
@Controller('auth')
@UseGuards() // This will exclude auth guard for the entire controller
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  async signup(@Body() signupDto: SignupDto) {
    try {
      return await this.authService.signup(signupDto);
    } catch (error) {
      if (error.message === 'Un compte existe déjà avec cette adresse email') {
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

 
  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT token' })
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'Returns the current user information' })
  async getProfile(@Req() req: Request) {
    try {
      // The user should be attached to the request by the JWT strategy
      const user = (req as any).user;
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
      
      // Return only the necessary user information
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        telephone: user.telephone,
        adresse: user.adresse,
        region: user.region,
        surfaceFerme: user.surfaceFerme,
        nbrVaches: user.nbrVaches
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
