import {mysqlTable,varchar,timestamp,int,foreignKey,} from 'drizzle-orm/mysql-core';
import { usersTable } from './users.table';

export const roomsTable = mysqlTable(
  'rooms',
  {
    id: varchar('id', { length: 26 }).primaryKey().notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    ownerId: varchar('owner_id',{length: 26}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    ownerFk: foreignKey({
      columns: [table.ownerId],
      foreignColumns: [usersTable.id],
    }),
  })
);
