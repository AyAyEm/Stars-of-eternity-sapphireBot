import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';
export default class extends SubCommandPluginCommand {
    private setEnabled;
    enable(msg: Message): Promise<void>;
    disable(msg: Message): Promise<void>;
    reset(msg: Message): Promise<void>;
}
