// src/shared/database/database.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql2 from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './tables';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private connection: mysql2.Connection;
  private db;

  async onModuleInit() {
    this.connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });

    this.db = drizzle(this.connection, { schema, mode: 'default' });
    console.log('Banco conectado');
  }

  getDb() {
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }

  getConnection() {
    if (!this.connection) throw new Error('Database connection not initialized');
    return this.connection;
  }
}
