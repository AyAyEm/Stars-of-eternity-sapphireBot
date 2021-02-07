/// <reference types="discord.js" />
/// <reference types="@sapphire/framework" />
/// <reference types="@sapphire/plugin-i18next/dist/register-discordjs" />
import type { EternityGuild } from './EternityGuild';
export interface EternityVoiceChannel {
    guild: EternityGuild;
}
declare const EternityVoiceChannel_base: typeof import("discord.js").VoiceChannel;
export declare class EternityVoiceChannel extends EternityVoiceChannel_base {
    get onlyMembers(): import("discord.js").Collection<string, import("discord.js").GuildMember>;
}
export {};
