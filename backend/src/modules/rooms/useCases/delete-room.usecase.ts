import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomRepository } from '../repositories/rooms.repository';
import { ROOM_ERRORS } from 'src/shared/constants/helpers/roomErrors.helpers';
import { ROOM_SUCESSFULL } from 'src/shared/constants/helpers/roomSucess.helpers';
@Injectable()
export class DeleteRoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(roomId: string, ownerId: string) {
    const room = await this.roomRepo.findById(roomId);

    if (!room) throw new NotFoundException(ROOM_ERRORS.notFound);
    if (room.ownerId !== ownerId) throw new ForbiddenException(ROOM_ERRORS.notOwner);

    await this.roomRepo.delete(roomId);
    return { message: ROOM_SUCESSFULL.sucesfullDeleted};
  }
}
