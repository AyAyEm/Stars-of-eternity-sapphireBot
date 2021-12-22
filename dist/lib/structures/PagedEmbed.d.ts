import type { CollectorFilter, TextChannel, MessageEmbed, MessageReaction, Message, User } from 'discord.js';
import type { SapphireClient } from '@sapphire/framework';
export interface IPage {
    name: string;
    emoji: string;
}
export interface PagedEmbedContext {
    channel: TextChannel;
    client: SapphireClient;
}
export interface EmbedPage extends IPage {
    embed: MessageEmbed;
}
export interface PagedEmbedOptions {
    pages?: IPage[];
    time?: number;
    idle?: number;
    filter?: CollectorFilter<[MessageReaction, User]>;
}
export declare class PagedEmbed {
    readonly pages: IPage[];
    readonly client: SapphireClient;
    channel: TextChannel;
    timerOptions: {
        time: number;
        idle: number;
    };
    EmbedPages?: EmbedPage[];
    filter: CollectorFilter<[MessageReaction, User]>;
    constructor(context: PagedEmbedContext, options?: PagedEmbedOptions);
    makeEmbeds(): Promise<EmbedPage[]>;
    send(toEditMessage?: Message): Promise<void>;
}
