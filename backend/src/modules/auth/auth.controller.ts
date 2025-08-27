import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUseCase } from './useCases/login.usecase';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOperation({summary: 'Autentificação dos dados de login e criação do token jwt'})
  @ApiResponse({status: 201, description: 'Usuário autentificado e com novo token jwt caso ele esteja expirado'})
  @ApiResponse({status: 401, description: 'Possivel erro: email ou senha inválido'})
  async login(@Body() dto: LoginUserDto) {
    return this.loginUseCase.execute(dto);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({summary: 'Teste para ver se verificação de token jwt está funcionando corretamente'})
  @ApiResponse({status: 200, description: 'Autentificação funcionando corretamente'})
  @ApiResponse({status: 401, description: 'Erro na autentificação'})
  testAuth() {
    return { message: 'auth working' };
  }
  
}

