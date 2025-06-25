import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: varchar('id', {length: 26}).primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
