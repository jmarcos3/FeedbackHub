import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomRepository } from '../repositories/rooms.repository';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { ROOM_ERRORS } from 'src/shared/constants/helpers/roomErrors.helpers';

@Injectable()
export class UpdateRoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(roomId: string, ownerId: string, dto: UpdateRoomDto) {
    const room = await this.roomRepo.findById(roomId);

    if (!room) throw new NotFoundException(ROOM_ERRORS.notFound);

    if (room.ownerId !== ownerId) throw new ForbiddenException(ROOM_ERRORS.notOwner);
    
    return this.roomRepo.update(roomId, dto);
  }
}
