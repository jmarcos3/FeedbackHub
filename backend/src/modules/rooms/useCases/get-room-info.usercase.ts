import { Injectable, NotFoundException } from "@nestjs/common";
import { RoomRepository } from "../repositories/rooms.repository";
import { ROOM_ERRORS } from "src/shared/constants/helpers/roomErrors.helpers";
@Injectable()
export class GetRoomInfoUseCase {
  constructor(private readonly roomRepo: RoomRepository){}

  async execute(roomId: string){
    const room = await this.roomRepo.findById(roomId);
    
    if (!room) throw new NotFoundException(ROOM_ERRORS.notFound);

    return room
     
  }
}