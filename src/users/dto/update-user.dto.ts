import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profile_img?: string;  

  @IsOptional()
  @IsString()
  currentPassword?: string; 

  @IsOptional()
  @IsString()
  newPassword?: string; 
}
