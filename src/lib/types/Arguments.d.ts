import type { Emoji } from 'discord.js';
import type { Connection } from 'typeorm';

import type { Items } from '#lib/eternity/warframe';

declare module '@sapphire/framework' {
  interface ArgType {
    emoji: Emoji;
    warframeItem: string;
  }
}

interface WarframeOptions {
  items: Items,
}

declare module '@sapphire/pieces' {
  interface Container {
    warframe: WarframeOptions;
    connection: Connection;
    ready: Promise<void>;
  }
}

declare module 'discord.js' {
  interface Client {
    ready: Promise<void>;
  }
}
