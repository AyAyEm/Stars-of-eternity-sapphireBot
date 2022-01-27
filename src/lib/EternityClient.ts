import { SapphireClient } from '@sapphire/framework';

import { clientOptions } from '#root/config';
import { TaskStore } from './structures';

export class EternityClient extends SapphireClient {
  public tasks: TaskStore;

  public fetchPrefix = () => '/';

  public ready = new Promise<void>((resolve) => this.once('ready', () => resolve()));

  /**
   * Returns a promise that resolves when the client is ready.
   */

  public constructor() {
    super(clientOptions);

    this.tasks = new TaskStore();
    this.stores.register(this.tasks).registerPath();
  }

  /**
   * Returns an invitation link for the bot.
   */
  public get invite() {
    return `https://discord.com/oauth2/authorize?client_id=${this.id}&scope=bot`;
  }
}
