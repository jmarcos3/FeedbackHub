import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './useCases/create-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUseCase: CreateUserUseCase
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.registerUseCase.execute(createUserDto)
  }

}
