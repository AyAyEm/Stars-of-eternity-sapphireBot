import { SapphireClient } from '@sapphire/framework';
import { TaskStore } from './structures';
export declare class EternityClient extends SapphireClient {
    tasks: TaskStore;
    fetchPrefix: () => string;
    ready: Promise<void>;
    /**
     * Returns a promise that resolves when the client is ready.
     */
    constructor();
    /**
     * Returns an invitation link for the bot.
     */
    get invite(): string;
}
