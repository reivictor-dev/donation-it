import { Injectable, InternalServerErrorException, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async signIn(email: string, pass: string, res) {
        const user = await this.userService.validateCredentials({
            email,
            password: pass
        })
        const payload = {sub: user.id, email: user.email}

        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m'})

        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d'})

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        return res.status(200).json({
            access_token: accessToken
        })
    }

    async refreshToken(@Req() req){
        try {
            const refreshToken = req.cookies['refresh_token']
            if(!refreshToken) {
                throw new UnauthorizedException('No refresh token')
            }
            const payload = this.jwtService.verify(refreshToken)
            const newAccessToken = this.jwtService.sign({sub:payload.sub, email: payload.email}, {expiresIn: '15m'})

            return {access_token: newAccessToken}

        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token')
        }
    }

    async signUp(name:string, email: string, pass: string, ){
        const user = await this.userService.create(
            name,
            email,
            pass
        )

        if(!user){
            throw new InternalServerErrorException()
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    
}

