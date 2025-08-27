import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateFeedbackUseCase } from './useCases/create-feedback.usecase';
import { AuthGuard } from '@nestjs/passport';
import { ListFeedbacksUseCase } from './useCases/list-feedbacks.usecase';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly createFeedback: CreateFeedbackUseCase,
    private readonly listFeedbacks: ListFeedbacksUseCase,
  ) {}

  @Post(':roomId')
  @ApiOperation({summary: 'Criação de um feedback na sala'})
  @ApiResponse({status: 201, description: 'Feedback criado com sucesso'})
  @ApiResponse({status: 401, description: 'Possivel error: Usuário não autorizado a ver a lista de feedbacks'})
  @ApiResponse({status: 404, description: 'Possivel error: id da sala inválido/não existe'})
  async create(
    @Param('roomId') roomId: string,
    @Body() dto: CreateFeedbackDto,
  ) {
    const feedback = await this.createFeedback.execute(dto, roomId);
    return feedback;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':roomId')
  @ApiBearerAuth('access-token')
  @ApiOperation({summary: 'Listar feedbacks pertecentes a uma sala'})
  @ApiResponse({status: 200, description: 'Devolve a lista de feedbacks da respectiva sala'})
  @ApiResponse({status: 401, description: 'Possivel error: Usuário não autorizado a ver a lista de feedbacks'})
  @ApiResponse({status: 404, description: 'Possivel error: id da sala inválido/não existe'})
  async getFeedbacksByRoom(
    @Param('roomId') roomId: string,
    @Req() req: any,
  ) {
    const ownerId = req.user.sub
    return this.listFeedbacks.execute(roomId, ownerId);
}
}
