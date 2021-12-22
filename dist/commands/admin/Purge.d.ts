import { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { EternityCommand } from "../../lib";
export default class extends EternityCommand {
    messageRun(msg: Message, args: Args): Promise<void>;
}
