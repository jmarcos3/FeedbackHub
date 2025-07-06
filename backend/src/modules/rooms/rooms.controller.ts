import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateRoomUseCase } from './useCases/create-room.usecase';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly createRoomUseCase: CreateRoomUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateRoomDto, @Req() req: Request) {
    const user = req.user as { sub: string };
    return this.createRoomUseCase.execute(dto, user.sub);
  }
}
