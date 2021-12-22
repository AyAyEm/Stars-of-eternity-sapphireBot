import { UserError, CommandErrorPayload } from '@sapphire/framework';
import { Message } from 'discord.js';
import type { EternityCommand } from "..";
export interface EternityCommandErrorPayload extends CommandErrorPayload {
    piece: EternityCommand;
    message: Message;
}
export declare class CommandError extends UserError {
    readonly command: EternityCommand;
    readonly payload: CommandErrorPayload;
    get name(): string;
}
