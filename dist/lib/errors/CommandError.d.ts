import { UserError, CommandErrorPayload } from '@sapphire/framework';
import type { EternityCommand, EternityMessage } from "..";
export interface EternityCommandErrorPayload extends CommandErrorPayload {
    piece: EternityCommand;
    message: EternityMessage;
}
export declare class CommandError extends UserError {
    readonly command: EternityCommand;
    readonly payload: CommandErrorPayload;
    get name(): string;
}