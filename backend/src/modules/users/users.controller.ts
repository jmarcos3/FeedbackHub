import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './useCases/create-user.usecase';
@ApiTags('Users') 
@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUseCase: CreateUserUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Possivel erro: Já Existe um usuário cadastrado com esse email' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.registerUseCase.execute(createUserDto);
  }
}
