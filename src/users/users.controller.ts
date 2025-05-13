import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/db/entities/user.entity';
import { UploadService } from 'src/utils/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.authguard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SelfGuard } from 'src/auth/guards/self.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly uploadService: UploadService,
    ){}

    @Roles('USER')
    @Get()
    async findAll(): Promise<UserResponseDto[]>{
        return this.usersService.findAll()
    }

    @Roles('USER')
    @Get(':id')
    async findById(@Param('id') id: number): Promise<User | null>{
        return this.usersService.findById(id)
    }
    
    @UseInterceptors(FileInterceptor('profile_img'))
    @Post("register")
    @HttpCode(201)
    async create(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('confirmPassword') confirmPassword: string,
        @Body('phone') phone: string,
        @Body('address') address: string,
        @UploadedFile() file: Express.Multer.File,
    ){
        let profile_img: string | null = null
        if(file){
            profile_img = this.uploadService.saveImage(file, 'user', 0)
        }

        if(profile_img === null){
            profile_img = "User without image"
        }

        const createUserDTO = new CreateUserDto()
        createUserDTO.name = name
        createUserDTO.email = email
        createUserDTO.password = password 
        createUserDTO.confirmPassword = confirmPassword
        createUserDTO.phone = phone
        createUserDTO.address = address
        createUserDTO.profile_img = profile_img

        const user = await this.usersService.create(createUserDTO)
        return user
    }

    @UseGuards(JwtAuthGuard, RolesGuard, SelfGuard)
    @Roles('USER')
    @Patch("update/:id")
    async update(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('address') address: string,

    ){
        const userToUpdate = new UpdateUserDto()
        userToUpdate.name = name    
        userToUpdate.email = email
        userToUpdate.phone = phone
        userToUpdate.address = address
        
        return this.usersService.update(id, userToUpdate)
    }

    @Roles('USER')
    @Patch("updatePassword")
    async updatePassword(
        @Param('id') id: number,
        @Body('currentPassword') currentPassword: string,
        @Body('newPassword') newPassword: string,
    ){
        const userToUpdate = new UpdateUserDto()
        userToUpdate.currentPassword = currentPassword    
        userToUpdate.newPassword = newPassword

        return this.usersService.updatePassword(id, userToUpdate)
    }

    @Roles('ADMIN')
    @Post("createAdmin")
    async createAdmin(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('confirmPassword') confirmPassword: string,
        @Body('phone') phone: string,
        @Body('address') address: string,
    ){
        const createUserDTO = new CreateUserDto()
        createUserDTO.name = name
        createUserDTO.email = email
        createUserDTO.password = password 
        createUserDTO.confirmPassword = confirmPassword
        createUserDTO.phone = phone
        createUserDTO.address = address

        return this.usersService.createAdmin(createUserDTO)
    }
    

}
