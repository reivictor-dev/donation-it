import { IsEmail, IsEnum, IsNotEmpty, IsOptional, isString, IsString, IsStrongPassword, Length } from "class-validator";
import { User } from "src/db/entities/user.entity";

export enum Roles {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    @Length(6, 100)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    confirmPassword: string; // For password confirmation

    @IsEnum(Roles)
    @IsOptional()
    @IsNotEmpty()
    role: Roles;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    address: string;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    profile_img?: string; // Optional field for profile picture URL
}