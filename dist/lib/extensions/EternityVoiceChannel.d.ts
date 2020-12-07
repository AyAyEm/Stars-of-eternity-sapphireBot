/// <reference types="discord.js" />
/// <reference types="@sapphire/framework/dist/lib/sapphireclient" />
/// <reference types="@sapphire/framework/dist/lib/types/events" />
/// <reference types="@scp/in17n/dist/lib/in17n" />
import type { EternityGuild } from './EternityGuild';
export interface EternityVoiceChannel {
    guild: EternityGuild;
}
declare const EternityVoiceChannel_base: typeof import("discord.js").VoiceChannel;
export declare class EternityVoiceChannel extends EternityVoiceChannel_base {
    get onlyMembers(): import("discord.js").Collection<string, import("discord.js").GuildMember>;
}
export {};
