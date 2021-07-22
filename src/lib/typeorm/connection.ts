import 'reflect-metadata';

import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import type { ConnectionOptions } from 'typeorm';

import * as entities from './models';

dotenv.config();
export const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: process.env.NODE_ENV === 'development' ? 'all' : false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [...Object.values(entities)],
  migrations: [
    'src/lib/typeorm/migrations/**/*.ts',
  ],
  subscribers: [
    'src/lib/typeorm/subscriber/**/*.ts',
  ],
  cli: {
    migrationsDir: 'src/lib/typeorm/migrations/generated',
  },
};
