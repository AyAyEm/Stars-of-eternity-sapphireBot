import { Message } from 'discord.js';
import { Args } from '@sapphire/framework';
import { EternityCommand } from "../../lib";
export default class extends EternityCommand {
    messageRun(msg: Message, args: Args): Promise<void>;
}
