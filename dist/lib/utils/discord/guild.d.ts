import type { VoiceChannel, Guild, Collection } from 'discord.js';
export declare function voiceChannels(guild: Guild): Collection<string, VoiceChannel>;
export declare function channelWithMostMembers(guild: Guild): VoiceChannel;
