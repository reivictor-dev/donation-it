import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/db/entities/user.entity';
import { UploadService } from 'src/utils/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly uploadService: UploadService,
    ){}

    @Get()
    async findAll(): Promise<User[]>{
        return this.usersService.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<User | null>{
        return this.usersService.findById(id)
    }
    
    @UseInterceptors(FileInterceptor('profile_img'))
    @Post("register")
    async create(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @UploadedFile() file: Express.Multer.File,
    ){
        const user = await this.usersService.create(name,email,password)
        if(file){
            const path = this.uploadService.saveImage(file, 'user', user.id)
            user.profile_img = path
            await this.usersService.save(user)

        return user
        }
    }

    @Post("update")
    async update(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('currentPassword') currentPassword: string,
        @Body('newPassword') newPassword: string,
    ){
        return this.usersService.update(name,email,currentPassword,newPassword)
    }



}
