import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
  throw new Error('Alguma variável de ambiente do banco não está definida');
}

export default defineConfig({
  out: './drizzle',
  schema: './src/shared/database/tables/*.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
});
