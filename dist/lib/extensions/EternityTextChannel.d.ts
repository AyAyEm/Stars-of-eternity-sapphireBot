/// <reference types="@sapphire/framework" />
/// <reference types="@sapphire/plugin-i18next/dist/register-discordjs" />
import type { TextChannel } from 'discord.js';
import type { EternityGuild } from './EternityGuild';
export interface EternityTextChannel extends TextChannel {
    guild: EternityGuild;
}
declare const EternityTextChannel_base: typeof TextChannel;
export declare class EternityTextChannel extends EternityTextChannel_base {
    sendAndDelete(content: string, options?: {
        timeout?: number;
        reason?: string;
    }): Promise<import("discord.js").Message>;
}
export {};
