import { Injectable } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { DatabaseService } from 'src/shared/database/database.service';
import { feedbacksTable } from 'src/shared/database/tables/feedback.table';
import { ulid } from 'ulid';

@Injectable()
export class FeedbackRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  private get db() {
    return this.databaseService.getDb();
  }

  async create(content: string, roomId: string) {
    const feedbackToCreate = {
      id: ulid(),
      roomId,
      content,
      createdAt: new Date(),
    };

    await this.db.insert(feedbacksTable).values(feedbackToCreate);

    return feedbackToCreate
  }

  async findManyByRoomId(roomId: string) {
  const rows = await this.db
    .select()
    .from(feedbacksTable)
    .where(eq(feedbacksTable.roomId, roomId))
    .orderBy(desc(feedbacksTable.createdAt));

  return rows;
}

}
