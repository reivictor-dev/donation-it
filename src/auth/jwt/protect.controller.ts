import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt.authguard";


@Controller('protected')
export class ProtectedController{
    @Get()
    @UseGuards(JwtAuthGuard)
    getProtectedData(){
        return {message: 'This is a protected route'}
    }

}