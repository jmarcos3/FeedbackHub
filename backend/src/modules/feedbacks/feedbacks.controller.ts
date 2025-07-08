import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateFeedbackUseCase } from './useCases/create-feedback.usecase';


@Controller('feedback')
export class FeedbackController {
  constructor(private readonly createFeedback: CreateFeedbackUseCase) {}

  @Post(':roomId')
  async create(
    @Param('roomId') roomId: string,
    @Body() dto: CreateFeedbackDto,
  ) {
    const feedback = await this.createFeedback.execute(dto, roomId);
    return feedback;
  }
}
