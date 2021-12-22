import { Listener, UserError, CommandErrorPayload } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { CommandError } from "../../lib";
declare type PossibleErrors = Error | CommandError | UserError | unknown;
interface EternityCommandErrorPayload extends CommandErrorPayload {
    message: Message;
}
export default class extends Listener {
    run(error: PossibleErrors, { message, piece }: EternityCommandErrorPayload): void;
}
export {};
