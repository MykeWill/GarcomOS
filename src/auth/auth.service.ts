import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email)

        if(!user) {
            throw new UnauthorizedException('Credencias inválidas')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            throw new UnauthorizedException('Credencias inválidas')
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
