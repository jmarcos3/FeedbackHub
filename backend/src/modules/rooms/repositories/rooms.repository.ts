
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from 'src/shared/database/database.service';
import { roomsTable } from 'src/shared/database/tables';
import { ulid } from 'ulid';
import { UpdateRoomDto } from '../dto/update-room.dto';

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

  async findAllByOwner(ownerId: string) {
  return await this.db
    .select()
    .from(roomsTable)
    .where(eq(roomsTable.ownerId, ownerId));
}

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(roomsTable)
      .where(eq(roomsTable.id, id));
    return result[0];
  }

async update(id: string, dto: UpdateRoomDto) {
  await this.db
    .update(roomsTable)
    .set({
      title: dto.title,
      description: dto.description,
      updatedAt: new Date(),
    })
    .where(eq(roomsTable.id, id));

  const updatedRoom = await this.db
    .select()
    .from(roomsTable)
    .where(eq(roomsTable.id, id));

  return updatedRoom[0]; 
}

async delete(id: string) {
  await this.db.delete(roomsTable).where(eq(roomsTable.id, id));
}

}
