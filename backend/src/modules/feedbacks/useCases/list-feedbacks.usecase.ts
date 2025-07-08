import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { FeedbackRepository } from "../repositories/feedback.repository";
import { RoomRepository } from "src/modules/rooms/repositories/rooms.repository";
import { ROOM_ERRORS } from "src/shared/constants/helpers/roomErrors.helpers";

@Injectable()
export class ListFeedbacksUseCase {
  constructor(
    private readonly feedbacksRepository: FeedbackRepository,
    private readonly roomsRepository: RoomRepository,
  ) {}

  async execute(roomId: string, ownerId: string) {
    const room = await this.roomsRepository.findById(roomId);

    if (!room) throw new NotFoundException(ROOM_ERRORS.notFound);
    
    if (room.ownerId !== ownerId) throw new ForbiddenException(ROOM_ERRORS.notEnoughPermissions);
    
    return this.feedbacksRepository.findManyByRoomId(roomId);
  }
}
