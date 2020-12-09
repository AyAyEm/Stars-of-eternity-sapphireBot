/// <reference types="discord.js" />
/// <reference types="@sapphire/framework/dist/lib/SapphireClient" />
/// <reference types="@sapphire/framework/dist/lib/types/Events" />
/// <reference types="@scp/in17n/dist/lib/In17n" />
import type { EternityGuild } from './EternityGuild';
export interface EternityVoiceChannel {
    guild: EternityGuild;
}
declare const EternityVoiceChannel_base: typeof import("discord.js").VoiceChannel;
export declare class EternityVoiceChannel extends EternityVoiceChannel_base {
    get onlyMembers(): import("discord.js").Collection<string, import("discord.js").GuildMember>;
}
export {};
