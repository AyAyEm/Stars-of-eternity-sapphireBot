import { EternityEvent, CommandError } from '@lib';
import { Events, ArgumentError } from '@sapphire/framework';
declare type PossibleErrors = ArgumentError<unknown> | CommandError | Error;
export default class extends EternityEvent<Events.EventError> {
    run(error: PossibleErrors): Promise<void>;
}
export {};
