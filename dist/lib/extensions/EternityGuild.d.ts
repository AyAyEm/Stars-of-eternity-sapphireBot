/// <reference types="@sapphire/framework/dist/lib/sapphireclient" />
/// <reference types="@sapphire/framework/dist/lib/types/events" />
/// <reference types="@scp/in17n/dist/lib/in17n" />
import type { Collection } from 'discord.js';
import { EternityVoiceChannel } from './EternityVoiceChannel';
declare const EternityGuild_base: typeof import("discord.js").Guild;
export declare class EternityGuild extends EternityGuild_base {
    get voiceChannels(): Collection<string, import("discord.js").GuildChannel>;
    get channelWithMostMembers(): EternityVoiceChannel;
}
export {};
