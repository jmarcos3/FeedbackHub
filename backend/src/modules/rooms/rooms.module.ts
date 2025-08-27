import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UsersModule } from '../users/users.module';
import { RoomsController } from './rooms.controller';
import { CreateRoomUseCase } from './useCases/create-room.usecase';
import { RoomRepository } from './repositories/rooms.repository';
import { ListRoomsUseCase } from './useCases/list-rooms.usecase';
import { UpdateRoomUseCase } from './useCases/update-room.usecase';
import { DeleteRoomUseCase } from './useCases/delete-room.usecase';
import { GetRoomInfoUseCase } from './useCases/get-room-info.usercase';
@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [RoomsController],
  providers: [CreateRoomUseCase,
    ListRoomsUseCase,
    UpdateRoomUseCase,
    DeleteRoomUseCase,
    GetRoomInfoUseCase,
    RoomRepository
  ],
  exports: [RoomRepository],
})
export class RoomsModule {}
