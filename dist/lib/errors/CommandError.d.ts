import { UserError, CommandErrorPayload } from '@sapphire/framework';
import type { EternityCommand, EternityMessage } from '@lib';
export interface EternityCommandErrorPayload extends CommandErrorPayload {
    piece: EternityCommand;
    message: EternityMessage;
}
export declare class CommandError extends UserError {
    readonly name = "CommandError";
    readonly command: EternityCommand;
    readonly payload: CommandErrorPayload;
}
