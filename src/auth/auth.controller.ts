import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Res, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.authguard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signIn')
    async signIn(@Body() signInDto: { email: string; password: string }, @Res() res: Response) {
        return this.authService.signIn(signInDto.email, signInDto.password, res);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('refresh_token',{
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        return res.status(200).json({message: 'Logged out successfully'})
    }

    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: Request, @Res() res:Response){
        const result = await this.authService.refreshToken(req)
        return res.status(200).json(result)
        
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any){
        return req.user
    }

}
