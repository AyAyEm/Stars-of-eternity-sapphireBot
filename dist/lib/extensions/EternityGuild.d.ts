/// <reference types="@sapphire/framework/dist/lib/SapphireClient" />
/// <reference types="@sapphire/framework/dist/lib/types/Events" />
/// <reference types="@scp/in17n/dist/lib/In17n" />
import type { Collection } from 'discord.js';
import { EternityVoiceChannel } from './EternityVoiceChannel';
declare const EternityGuild_base: typeof import("discord.js").Guild;
export declare class EternityGuild extends EternityGuild_base {
    get voiceChannels(): Collection<string, import("discord.js").GuildChannel>;
    get channelWithMostMembers(): EternityVoiceChannel;
}
export {};
