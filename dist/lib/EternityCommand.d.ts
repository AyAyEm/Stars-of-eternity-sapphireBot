import { Command, PieceContext, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { Args, ArgType, CommandContext } from '@sapphire/framework';
import { CommandError } from './errors';
export interface EternityCommandOptions extends CommandOptions {
    requiredArgs?: Array<keyof ArgType>;
}
export declare abstract class EternityCommand extends Command {
    requiredArgs: EternityCommandOptions['requiredArgs'];
    protected constructor(context: PieceContext, options: EternityCommandOptions);
    error: (identifier: string, message: string) => CommandError;
    verifyArgs(args: Args, message: Message): Promise<void>;
    preParse(message: Message, parameters: string, context: CommandContext): Promise<Args>;
}
