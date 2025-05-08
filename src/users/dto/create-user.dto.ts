import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { User } from "src/db/entities/user.entity";

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
    @Length(6, 100)
    password: string;

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