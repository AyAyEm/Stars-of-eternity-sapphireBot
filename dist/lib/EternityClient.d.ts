/// <reference types="node" />
import '@lib/extenders';
import { SapphireClient } from '@sapphire/framework';
import { ClientOptions } from 'discord.js';
import { Mongoose } from './providers';
import { TaskStore } from './structures';
import { Items } from './eternity/warframe';
export declare class EternityClient extends SapphireClient {
    tasks: TaskStore;
    provider: Mongoose;
    fetchPrefix: () => string;
    fetchLanguage: () => string;
    warframe: {
        items: Items;
    };
    console: Console;
    /**
     * Returns a promise that resolves when the client is ready.
     */
    ready: Promise<void>;
    constructor(options?: ClientOptions);
    /**
     * Returns an invitation link for the bot.
     */
    get invite(): string;
}
