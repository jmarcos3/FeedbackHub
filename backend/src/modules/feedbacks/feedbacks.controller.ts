import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateFeedbackUseCase } from './useCases/create-feedback.usecase';
import { AuthGuard } from '@nestjs/passport';
import { ListFeedbacksUseCase } from './useCases/list-feedbacks.usecase';


@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly createFeedback: CreateFeedbackUseCase,
    private readonly listFeedbacks: ListFeedbacksUseCase,
  ) {}

  @Post(':roomId')
  async create(
    @Param('roomId') roomId: string,
    @Body() dto: CreateFeedbackDto,
  ) {
    const feedback = await this.createFeedback.execute(dto, roomId);
    return feedback;
  }

  @Get(':roomId')
  @UseGuards(AuthGuard('jwt'))
  async getFeedbacksByRoom(
    @Param('roomId') roomId: string,
    @Req() req: any,
  ) {
    const ownerId = req.user.sub
    return this.listFeedbacks.execute(roomId, ownerId);
}
}
