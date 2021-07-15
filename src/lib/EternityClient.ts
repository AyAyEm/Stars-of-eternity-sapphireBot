import '@sapphire/plugin-i18next/register';

import { SapphireClient } from '@sapphire/framework';
import { mergeDefault } from '@sapphire/utilities';
import { ClientOptions } from 'discord.js';
import { clientOptions } from '@utils/I18n';

import { createConnection, Connection } from 'typeorm';

import { config as connectionConfig } from './typeorm/connection';
import { Mongoose } from './providers';
import { TaskStore } from './structures';
import { Items } from './eternity/warframe';

import './Extenders';

export class EternityClient extends SapphireClient {
  public tasks = new TaskStore();

  public provider: Mongoose = new Mongoose();

  public connection!: Connection;

  public fetchPrefix = () => '/';

  public fetchLanguage = () => 'pt-BR';

  public warframe = {
    items: new Items(),
  };

  public console = console;

  /**
   * Returns a promise that resolves when the client is ready.
   */
  public ready = new Promise<void>((resolve) => this.once('ready', () => resolve()));

  constructor(options?: ClientOptions) {
    // @ts-expect-error Type instantiation is excessively deep and possibly infinite. ts(2589)
    super(mergeDefault(clientOptions, { ...options, caseInsensitiveCommands: true }));

    this.stores.register(this.tasks)
      .registerUserDirectories();
  }

  /**
   * Returns an invitation link for the bot.
   */
  public get invite() {
    return `https://discord.com/oauth2/authorize?client_id=${this.id}&scope=bot`;
  }

  public async login(token?: string) {
    this.connection = await createConnection({
      ...connectionConfig,
      migrations: null,
      subscribers: null,
    });

    return super.login(token);
  }
}
