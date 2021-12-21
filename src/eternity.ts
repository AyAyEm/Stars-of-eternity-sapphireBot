import '@sapphire/plugin-i18next/register';
import '@sapphire/plugin-logger/register';

import mongoose from 'mongoose';
import { createClient } from 'redis';
import { container } from '@sapphire/framework';

import { EternityClient } from '#lib';
import { Items } from '#lib/eternity';
import { config } from './config';

const client = new EternityClient();

(async function main() {
  container.warframe = {
    items: new Items(),
  };

  container.redisClient = createClient({ url: config.redisUrl });
  await container.redisClient.connect();
  container.redisClient.on('error', (err) => container.logger.error('Redis ', err));

  container.mongoClient = await mongoose.connect(
    config.mongoUrl, 
    {
      authSource: 'admin',
      user: config.mongoUser,
      pass: config.mongoPass,
    },
  );
  client.once('ready', () => container.logger.info('Ready'));
  await client.login(config.token);
}()).catch(console.error);
