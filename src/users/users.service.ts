import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { PasswordService } from 'src/utils/password.service';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toUserResponseDto } from 'src/utils/user-mapper';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly passwordService: PasswordService
    ){}

    async findAll(): Promise<UserResponseDto[]>{
        const users = await this.userRepository.find()
        return users.map(user => toUserResponseDto(user))
    }

    async findById(id : number): Promise<User | null>{
        return await this.userRepository.findOne({ where: { id }}) 
    }

    async create(createUserDTO: CreateUserDto): Promise<UserResponseDto>{
        const { name, email, password, phone, address, profile_img } = createUserDTO
        const existingUser = await this.findUserByEmail(email)
        if(existingUser){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }  

        const hashedPass = await this.passwordService.hashPassword(password)

        const user = this.userRepository.create({
            name,
            email, 
            password: hashedPass,
            phone,
            address,
            profile_img: profile_img || undefined,
            created_at: new Date(),
            updated_at: new Date()
        })
        await this.userRepository.save(user)
        return toUserResponseDto(user)
    }

    async update(id: number, updateUserDTO: UpdateUserDto): Promise<User>{
        const { name, email, phone, address, profile_img } = updateUserDTO
        const user = await this.findById(id)

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        if (email) {
            const existingUser = await this.findUserByEmail(email)
            if (existingUser && existingUser.id !== id) {
                throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST)
            }
        }
        

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

    async deleteUser(id: number): Promise<void> {
        const user = await this.findById(id)

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        await this.userRepository.delete(id)
        return
    }

    async updateProfileImg(id: number, profilePicture: string): Promise<User> {
        const user = await this.findById(id)

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        user.profile_img = profilePicture
        user.updated_at = new Date()

        await this.userRepository.save(user)
        return user
    }

}
