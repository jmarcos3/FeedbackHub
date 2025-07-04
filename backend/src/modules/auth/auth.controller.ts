import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUseCase } from './useCases/login.usecase';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.loginUseCase.execute(dto);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testAuth() {
    return { message: 'auth working' };
  }
  
}

