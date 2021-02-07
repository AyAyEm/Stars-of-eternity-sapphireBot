/// <reference types="@sapphire/framework" />
/// <reference types="@sapphire/plugin-i18next/dist/register-discordjs" />
import type { Collection } from 'discord.js';
import { EternityVoiceChannel } from './EternityVoiceChannel';
declare const EternityGuild_base: typeof import("discord.js").Guild;
export declare class EternityGuild extends EternityGuild_base {
    get voiceChannels(): Collection<string, import("discord.js").GuildChannel>;
    get channelWithMostMembers(): EternityVoiceChannel;
}
export {};
