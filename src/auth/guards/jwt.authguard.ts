import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers['authorization']?.split(' ')[1]

        if(!token){
            throw new UnauthorizedException('token not found')
        }

        try {
            const decoded = this.jwtService.verify(token)
            request.user = decoded
            return true
        } catch (e) {
            throw new UnauthorizedException('Invalid or expired token')            
        }
    }
}