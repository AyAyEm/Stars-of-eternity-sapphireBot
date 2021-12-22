import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import type { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
export default class extends SubCommandPluginCommand {
    private mapToEmbed;
    create(msg: Message, args: Args): Promise<void>;
    delete(msg: Message, args: Args): Promise<void>;
    add(msg: Message, args: Args): Promise<void>;
    renew(msg: Message, args: Args): Promise<void>;
}
