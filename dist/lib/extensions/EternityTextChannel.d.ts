/// <reference types="discord.js" />
/// <reference types="@sapphire/framework/dist/lib/SapphireClient" />
/// <reference types="@sapphire/framework/dist/lib/types/Events" />
/// <reference types="@scp/in17n/dist/lib/In17n" />
import type { EternityGuild } from './EternityGuild';
export interface EternityTextChannel {
    guild: EternityGuild;
}
declare const EternityTextChannel_base: typeof import("discord.js").TextChannel;
export declare class EternityTextChannel extends EternityTextChannel_base {
    sendAndDelete(content: string, options?: {
        timeout?: number;
        reason?: string;
    }): Promise<import("discord.js").Message>;
}
export {};
