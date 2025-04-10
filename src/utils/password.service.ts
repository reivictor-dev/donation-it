import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService{
    private readonly saltRounds = 10

    async hashPassword(pass: string): Promise<string>{
        
        const salt = await bcrypt.genSalt(this.saltRounds)
        return bcrypt.hash(pass, salt)
    }

    async comparePass(providePass: string, storedPass: string): Promise<boolean> {
        return bcrypt.compare(providePass, storedPass)
    }
}