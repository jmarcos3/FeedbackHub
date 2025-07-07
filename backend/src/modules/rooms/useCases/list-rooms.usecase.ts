// rooms/useCases/list-rooms.usecase.ts
import { Injectable } from '@nestjs/common';
import { RoomRepository } from '../repositories/rooms.repository';

@Injectable()
export class ListRoomsUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(ownerId: string) {
    const rooms = await this.roomRepo.findAllByOwner(ownerId);
    return rooms;
  }
}
