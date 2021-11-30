import type { Connection } from 'typeorm';
import type { Items } from '#lib/eternity/warframe';

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

export {};
