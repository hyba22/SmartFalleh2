import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  AGRICULTEUR = 'agriculteur',
  JURY = 'jury',
  RESPONSABLE = 'responsable',
}

export class SignupDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  nom: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  prenom: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  telephone: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  adresse: string;

  @ApiProperty({ example: 'Paris', required: false })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ example: '100ha', required: false })
  @IsString()
  @IsOptional()
  surfaceFerme?: string;

  @ApiProperty({ example: 50, required: false })
  @IsNumber()
  @IsOptional()
  nbrVaches?: number;
}
