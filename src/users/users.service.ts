import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { PasswordService } from 'src/utils/password.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly passwordService: PasswordService
    ){}

    async findAll(): Promise<User[]>{
        return this.userRepository.find()
    }

    async findById(id : number): Promise<User | null>{
        return this.userRepository.findOne({ where: { id } })
    }

    async create(name: string, email: string, password: string): Promise<User>{
        const userInDb = await this.findUserByEmail(email)

        if(userInDb){
            throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST)
        }
        const hashedPass = await this.passwordService.hashPassword(password)

        const user = this.userRepository.create({
                name,
                email,
                password: hashedPass
            })
        
        await this.userRepository.save(user)
        return user
    }

    async validateCredentials({email, password}: {email: string, password: string}): Promise<User> {
        const user = await this.findUserByEmail(email)
        if(!user){
            throw new HttpException('User not found',HttpStatus.UNAUTHORIZED)
        }

        const isMatch = await this.passwordService.comparePass(password, user.password)
        if(!isMatch){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        }
        return user
    }
    
    //If not found the user, cheks with IF == 0
    async findIdByUserEmail(email : string): Promise<number>{
        const foundUser = await this.userRepository.findOne({ where: {email: email}})
        if(foundUser == null){
            return 0
        }
        return foundUser.id
    }

    async findUserByEmail(email: string): Promise<User|undefined> {
         const id = await this.findIdByUserEmail(email)

        const user = await this.findById(id)

        return user != undefined ? user : undefined
    }
}
