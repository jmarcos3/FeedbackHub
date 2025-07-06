import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../dto/create-room.dto';
import { RoomRepository } from '../repositories/rooms.repository';
import { ROOM_SUCESSFULL } from 'src/shared/constants/helpers/roomSucess.helpers';


@Injectable()
export class CreateRoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(dto: CreateRoomDto, ownerId: string) {

    const room = await this.roomRepo.create(dto,ownerId);

    return {
      message: ROOM_SUCESSFULL.sucessfullCreated,
      room,
    };
  }
}
