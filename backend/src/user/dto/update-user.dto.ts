import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

type UserRole = 'user' | 'admin' | 'agriculteur' | 'jury' | 'responsable';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly nom?: string;

    @IsString()
    @IsOptional()
    readonly prenom?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    readonly password?: string;

    @IsEnum(['user', 'admin', 'agriculteur', 'jury', 'responsable'], {
        message: 'Role must be one of: user, admin, agriculteur, jury, responsable'
    })
    @IsOptional()
    readonly role?: UserRole;

    @IsString()
    @IsOptional()
    readonly telephone?: string;

    @IsString()
    @IsOptional()
    readonly adresse?: string;

    @IsString()
    @IsOptional()
    readonly region?: string;

    @IsNumber()
    @IsOptional()
    readonly surfaceFerme?: number;

    @IsNumber()
    @IsOptional()
    readonly nbrVaches?: number;
    
}
