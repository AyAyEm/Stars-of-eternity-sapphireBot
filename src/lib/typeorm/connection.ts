import 'reflect-metadata';
import 'dotenv/config';
import '#lib/types/Sapphire';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import type { ConnectionOptions } from 'typeorm';

import * as entities from './models';

export const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: ['query', 'error'],
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
export default config;
