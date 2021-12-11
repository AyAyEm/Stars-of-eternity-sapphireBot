import '@sapphire/plugin-i18next/register';
import '@sapphire/plugin-logger/register';

import { container } from '@sapphire/framework';
import { createClient } from 'redis';

import { mongoConnect } from '#lib/mongodb/connection';

import { EternityClient } from '#lib';
import { Items } from '#lib/eternity';
import { config } from './config';

const client = new EternityClient();

(async function main() {
  container.warframe = {
    items: new Items(),
  };

  container.redisClient = createClient();
  await container.redisClient.connect();
  container.redisClient.on('error', (err) => container.logger.error('Redis ', err));

  container.mongoClient = await mongoConnect();

  client.once('ready', () => container.logger.info('Ready'));
  await client.login(config.token);
}()).catch(console.error);
