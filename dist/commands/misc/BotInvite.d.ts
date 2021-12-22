import type { Message } from 'discord.js';
import { EternityCommand } from "../../lib";
export default class extends EternityCommand {
    messageRun(msg: Message): Promise<void>;
}
