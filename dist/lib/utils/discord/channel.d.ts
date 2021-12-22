import type { TextChannel, VoiceChannel } from 'discord.js';
export interface SendAndDeleteOptions {
    content: string;
    timeout?: number;
}
export declare function sendAndDelete(channel: TextChannel, options: SendAndDeleteOptions | string): Promise<unknown>;
export declare function onlyMembers(channel: VoiceChannel): import("@discordjs/collection").Collection<string, import("discord.js").GuildMember>;
