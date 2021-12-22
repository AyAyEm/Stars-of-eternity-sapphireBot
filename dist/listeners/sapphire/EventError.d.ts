import { Listener, ArgumentError } from '@sapphire/framework';
import { CommandError } from "../../lib";
declare type PossibleErrors = ArgumentError<unknown> | CommandError | Error;
export default class extends Listener {
    run(error: PossibleErrors): Promise<void>;
}
export {};
