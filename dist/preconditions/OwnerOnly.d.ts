import { Message } from 'discord.js';
import { Awaited, Precondition, Result, UserError } from '@sapphire/framework';
export declare class ClientPrecondition extends Precondition {
    run(message: Message): Awaited<Result<unknown, UserError>>;
}
