import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService){
        const secret = process.env.AUTH_SECRET || configService.get<string>('AUTH_SECRET')

        if(!secret){
            throw new UnauthorizedException('JWT secret is not defined!')
        }
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        })
    }

    async validate(payload: any){
        return {userId: payload.sub, email: payload.email, role: payload.role}
    }
}