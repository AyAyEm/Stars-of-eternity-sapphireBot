import { EternityEvent, CommandError } from '@lib';
import { Events, UserError } from '@sapphire/framework';
import type { CommandErrorPayload } from '@sapphire/framework';
import type { EternityMessage } from '@lib';
declare type PossibleErrors = Error | CommandError | UserError | unknown;
interface EternityCommandErrorPayload extends CommandErrorPayload {
    message: EternityMessage;
}
export default class extends EternityEvent<Events.CommandError> {
    run(error: PossibleErrors, { message, piece }: EternityCommandErrorPayload): void;
}
export {};
