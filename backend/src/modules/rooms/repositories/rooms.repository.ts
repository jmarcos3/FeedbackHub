
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { roomsTable } from 'src/shared/database/tables';
import { ulid } from 'ulid';

@Injectable()
export class RoomRepository {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  private get db() {
    return this.databaseService.getDb();
  }

  async create(dto, ownerId) {

    const roomToCreate = {
      id: ulid(),
      title: dto.title,
      description: dto.description ?? null,
      ownerId: ownerId,
      createdAt: new Date()
    }

    await this.db.insert(roomsTable).values(roomToCreate);

    return roomToCreate;
  }
}
