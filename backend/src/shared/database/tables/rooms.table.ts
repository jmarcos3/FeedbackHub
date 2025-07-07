import { mysqlTable, varchar, timestamp, foreignKey } from 'drizzle-orm/mysql-core';
import { usersTable } from './users.table';

export const roomsTable = mysqlTable(
  'rooms',
  {
    id: varchar('id', { length: 26 }).primaryKey(),
    title: varchar('title', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }),
    ownerId: varchar('owner_id', { length: 26 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
  },
  (table) => ({
    ownerFk: foreignKey({
      columns: [table.ownerId],
      foreignColumns: [usersTable.id],
    }),
  })
);
