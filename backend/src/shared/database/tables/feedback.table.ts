import {mysqlTable, varchar, timestamp, foreignKey,} from 'drizzle-orm/mysql-core';
import { roomsTable } from './rooms.table';

export const feedbacksTable = mysqlTable(
  'feedbacks',
  {
    id: varchar('id', { length: 26 }).primaryKey().notNull(),
    roomId: varchar('room_id', {length: 26}).notNull(),
    content: varchar('content', {length:256}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    roomFk: foreignKey({
      columns: [table.roomId],
      foreignColumns: [roomsTable.id],
    }).onDelete('cascade'),
  })
);
