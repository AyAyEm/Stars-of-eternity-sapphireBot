import { Message } from 'discord.js';
import { Awaitable, Precondition, Result, UserError } from '@sapphire/framework';
export declare class OwnerOnly extends Precondition {
    run(message: Message): Awaitable<Result<unknown, UserError>>;
}
declare module '@sapphire/framework' {
    interface Preconditions {
        OwnerOnly: never;
    }
}
