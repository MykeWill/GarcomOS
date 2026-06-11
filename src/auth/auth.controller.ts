import { Controller, Body, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() logindto: LoginDto) {
        return this.authService.login(
            logindto.email,
            logindto.password
        )
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    me(@Request() req){
        return req.user
    }
}
