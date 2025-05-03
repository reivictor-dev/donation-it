import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/db/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    async findAll(): Promise<User[]>{
        return this.usersService.findAll()
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<User | null>{
        return this.usersService.findById(id)
    }
    
    @Post()
    async create(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,

    ){
        return this.usersService.create(name,email,password)
    }

    @Post()
    async update(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('currentPassword') currentPassword: string,
        @Body('newPassword') newPassword: string,
    ){
        return this.usersService.update(name,email,currentPassword,newPassword)
    }
}
