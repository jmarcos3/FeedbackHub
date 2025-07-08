import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { ROOM_ERRORS } from 'src/shared/constants/helpers/roomErrors.helpers';
import { RoomRepository } from 'src/modules/rooms/repositories/rooms.repository';
@Injectable()
export class CreateFeedbackUseCase {
  constructor(
    private readonly feedbackRepo: FeedbackRepository,
    private readonly roomRepo: RoomRepository, 
  ) {}

  async execute(dto: CreateFeedbackDto, roomId: string) {
    const room = await this.roomRepo.findById(roomId);

    if (!room) throw new NotFoundException(ROOM_ERRORS.notFound);
    
    const feedback = await this.feedbackRepo.create(dto.content, roomId);

    return feedback;
  }
}
