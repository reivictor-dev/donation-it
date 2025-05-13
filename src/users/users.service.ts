import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { PasswordService } from 'src/utils/password.service';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toUserResponseDto } from 'src/utils/user-mapper';
import { checkUserPermission } from 'src/utils/auth.utils';

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
        const { name, email, password,confirmPassword, phone, address, profile_img } = createUserDTO
        const existingUser = await this.findUserByEmail(email)
        if(existingUser){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }  

        if(password !== confirmPassword){
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST)
        }

        const hashedPass = await this.passwordService.hashPassword(password)

        const user = this.userRepository.create({
            name,
            email, 
            password: hashedPass,
            phone,
            role: 'USER',
            address,
            profile_img: profile_img || undefined,
            created_at: new Date(),
            updated_at: new Date()
        })
        await this.userRepository.save(user)
        return toUserResponseDto(user)
    }

    // Create admin user
    async createAdmin(createUserDTO: CreateUserDto): Promise<UserResponseDto>{
        const { name, email, password,confirmPassword, phone, address, profile_img } = createUserDTO
        const existingUser = await this.findUserByEmail(email)
        if(existingUser){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }  

        if(password !== confirmPassword){
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST)
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
            updated_at: new Date(),
            role: 'ADMIN'
        })
        await this.userRepository.save(user)
        return toUserResponseDto(user)
    }

    async update(id: number, updateUserDTO: UpdateUserDto): Promise<UserResponseDto>{
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
        
        user.updated_at = new Date()

        await this.userRepository.save(user)
        return toUserResponseDto(user)
    }

    async updatePassword(id: number, updateUserDTO: UpdateUserDto): Promise<User>{
        const { currentPassword, newPassword } = updateUserDTO
        const user = await this.findById(id)

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        if(!currentPassword || !newPassword){
            throw new HttpException('Current password and new password are required', HttpStatus.BAD_REQUEST)
        }

        const isMatch = await this.passwordService.comparePass(currentPassword, user.password)
        if(!isMatch){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        }

        const hashedPass = await this.passwordService.hashPassword(newPassword)
        user.password = hashedPass
        user.updated_at = new Date()

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

    async findUserByEmail(email: string): Promise<User|null>{ 
            const foundUser = await this.userRepository.findOne({ where: {email: email}})
            if(foundUser == null){
                return null
            }
            return foundUser
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
