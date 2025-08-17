import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

type UserRole = 'admin' | 'agriculteur' | 'jury' | 'responsable';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly nom: string;

    @IsString()
    @IsNotEmpty()
    readonly prenom: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsEnum([ 'admin', 'agriculteur', 'jury', 'responsable'], {
        message: 'Role must be one of: admin, agriculteur, jury, responsable'
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
    readonly surfaceFerme: number;

    @IsNumber()
    @IsOptional()
    readonly nbrVaches: number;

}
