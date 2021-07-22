import type { CollectorFilter } from 'discord.js';
import { EternityMessageEmbed } from "../extensions";
import type { EternityClient } from "../EternityClient";
import type { EternityTextChannel, EternityMessage } from "../extensions";
export interface IPage {
    name: string;
    emoji: string;
}
export interface PagedEmbedContext {
    channel: EternityTextChannel;
    client: EternityClient;
}
export interface EmbedPage extends IPage {
    embed: EternityMessageEmbed;
}
export interface PagedEmbedOptions {
    pages?: IPage[];
    time?: number;
    idle?: number;
    filter?: CollectorFilter;
}
export declare class PagedEmbed {
    readonly pages: IPage[];
    readonly client: EternityClient;
    channel: EternityTextChannel;
    timerOptions: {
        time: number;
        idle: number;
    };
    EmbedPages?: EmbedPage[];
    filter: CollectorFilter;
    constructor(context: PagedEmbedContext, options?: PagedEmbedOptions);
    makeEmbeds(): EmbedPage[];
    send(toEditMessage?: EternityMessage): Promise<void>;
}
