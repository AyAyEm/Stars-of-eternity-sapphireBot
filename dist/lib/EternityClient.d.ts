/// <reference types="node" />
import '@sapphire/plugin-i18next/register';
import { SapphireClient } from '@sapphire/framework';
import { ClientOptions } from 'discord.js';
import { Connection } from 'typeorm';
import { TaskStore } from './structures';
import { Items } from './eternity/warframe';
import './Extenders';
export declare class EternityClient extends SapphireClient {
    tasks: TaskStore;
    connection: Connection;
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
    login(token?: string): Promise<string>;
}
