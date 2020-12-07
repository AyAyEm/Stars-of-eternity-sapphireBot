import { EternityEvent, CommandError } from '@lib';
import { Events, UserError } from '@sapphire/framework';
import type { CommandErrorPayload } from '@sapphire/framework';
declare type PossibleErrors = Error | CommandError | UserError | unknown;
export default class extends EternityEvent<Events.CommandError> {
    run(error: PossibleErrors, { message, piece }: CommandErrorPayload): void;
}
export {};
