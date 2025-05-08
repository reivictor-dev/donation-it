import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UserResponseDto {
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  profile_img?: string;

  created_at: Date;
  updated_at: Date;
}
