// src/modules/rooms/rooms.module.ts
import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/shared/database/database.module';
import { UsersModule } from '../users/users.module';
import { RoomsController } from './rooms.controller';
import { CreateRoomUseCase } from './useCases/create-room.usecase';
import { RoomRepository } from './repositories/rooms.repository';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [RoomsController],
  providers: [CreateRoomUseCase, RoomRepository],
})
export class RoomsModule {}
