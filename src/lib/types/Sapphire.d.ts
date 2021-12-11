import type { createClient } from 'redis';
import type { Mongoose } from 'mongoose';

import type { Items } from '#lib/eternity/warframe';

interface WarframeOptions {
  items: Items,
}

declare module '@sapphire/pieces' {
  interface Container {
    warframe: WarframeOptions;
    ready: Promise<void>;
    redisClient: ReturnType<typeof createClient>;
    mongoClient: Mongoose;
  }
}

export {};
