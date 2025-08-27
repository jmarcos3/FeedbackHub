import { Controller, Post, Body, UseGuards, Req, Get, Patch, Param, Delete } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreateRoomUseCase } from './useCases/create-room.usecase';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ListRoomsUseCase } from './useCases/list-rooms.usecase';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UpdateRoomUseCase } from './useCases/update-room.usecase';
import { DeleteRoomUseCase } from './useCases/delete-room.usecase';
import { GetRoomInfoUseCase } from './useCases/get-room-info.usercase';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly listRoomsUseCase: ListRoomsUseCase,
    private readonly updateRoomUseCase: UpdateRoomUseCase,
    private readonly deleteRoomUseCase: DeleteRoomUseCase,
    private readonly getRoomInfoUseCase: GetRoomInfoUseCase,) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({summary: 'Criação da sala de feedback'})
  @ApiResponse({status: 201, description: 'Sala criada com sucesso'})
  @ApiResponse({status: 401, description: 'Possiveis Erros: Unauthorized - Bearer Token inválido ou expirado'})
  async create(@Body() dto: CreateRoomDto, @Req() req: Request) {
    const user = req.user as { sub: string };
    return this.createRoomUseCase.execute(dto, user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({summary: 'Listar salas do usuário'})
  @ApiResponse({status: 200, description: 'Devolve a lista das salas do usuário'})
  @ApiResponse({status: 401, description: 'Possivel Erro: Unauthorized - Bearer Token expirado'})
  async list(@Req() req: any) {
    const ownerId = req.user.sub;
    return this.listRoomsUseCase.execute(ownerId);
  }

  @ApiOperation({summary: 'Pegar informações da sala'})
  @ApiResponse({status: 200, description: 'Devolve as informações da sala'})
  @ApiResponse({status: 404, description: 'Possivel erro: id da sala inválido'})
  @Get(':id')
  async getRoomInfo(@Param('id') roomId: string){
    return this.getRoomInfoUseCase.execute(roomId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({summary: 'Atualizar informações da sala'})
  @ApiResponse({status: 200, description: 'Devolve a sala atualizada'})
  @ApiResponse({status: 404, description: 'Possiveis erros: -Usuário não autorizado, -Sala não existe'})
  async updateRoom(
    @Param('id') id: string,
    @Body() dto: UpdateRoomDto,
    @Req() req: any,
  ) {
    const ownerId = req.user.sub;
    return this.updateRoomUseCase.execute(id, ownerId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({summary: 'Deletar uma sala'})
  @ApiResponse({status: 200, description: 'Sala deletada com sucesso'})
  @ApiResponse({status: 404, description: 'Possivel erro: Usuário não é o admin da sala'})
  async deleteRoom(@Param('id') roomId: string, @Req() req) {
    const ownerId = req.user.sub; 
    return this.deleteRoomUseCase.execute(roomId, ownerId);
}

}
