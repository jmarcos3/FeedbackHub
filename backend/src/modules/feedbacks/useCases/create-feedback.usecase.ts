import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { ROOM_ERRORS } from 'src/shared/constants/helpers/roomErrors.helpers';
import { RoomRepository } from 'src/modules/rooms/repositories/rooms.repository';
import { FEEDBACK_ERRORS } from 'src/shared/constants/helpers/feedbackErrors.helpers';
@Injectable()
export class CreateFeedbackUseCase {
  constructor(
    private readonly feedbackRepo: FeedbackRepository,
    private readonly roomRepo: RoomRepository, 
  ) {}

  async execute(dto: CreateFeedbackDto, roomId: string) {
    if (!Number.isInteger(dto.rating) || dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException(FEEDBACK_ERRORS.notInRange);
    }
    const room = await this.roomRepo.findById(roomId);

    if (!room) throw new NotFoundException(ROOM_ERRORS.notFound);
    
    const feedback = await this.feedbackRepo.create(dto.content, dto.rating, roomId);

    return feedback;
  }
}
