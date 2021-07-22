import { MessageEmbed } from 'discord.js';
import type { Guild } from 'discord.js';
declare type RolesEmoji = Map<string, {
    roleId: string;
}>;
export declare function mapToEmbed(guild: Guild, rolesEmoji: RolesEmoji, title?: string): Promise<MessageEmbed>;
export declare const firstEmbed: MessageEmbed;
export {};
