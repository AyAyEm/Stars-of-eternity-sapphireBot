import '@sapphire/plugin-i18next/register';
import '@sapphire/plugin-logger/register';

import { container } from '@sapphire/framework';
import connectionConfig from '#lib/typeorm/connection';

import { EternityClient } from '#lib';
import { Items } from '#lib/eternity';
import { config } from './config';
import { createConnection } from 'typeorm';

const client = new EternityClient();

(async function main() {
  container.connection = await createConnection({
    ...connectionConfig,
    migrations: null,
    subscribers: null,
  });

  container.warframe = {
    items: new Items(),
  };

  client.once('ready', () => container.logger.info('Ready'));
  await client.login(config.token);
}()).catch(console.error);
