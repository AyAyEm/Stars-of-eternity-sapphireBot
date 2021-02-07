import { Command, PieceContext, CommandOptions } from '@sapphire/framework';
import type { Args, ArgType, CommandContext } from '@sapphire/framework';
import type { EternityMessage } from '@lib';
import type { EternityClient } from './EternityClient';
import { CommandError } from './errors';
export interface EternityCommandOptions extends CommandOptions {
    requiredArgs?: Array<keyof ArgType>;
}
export declare abstract class EternityCommand extends Command {
    requiredArgs: EternityCommandOptions['requiredArgs'];
    protected constructor(context: PieceContext, options: EternityCommandOptions);
    get client(): EternityClient;
    error: (identifier: string, message: string) => CommandError;
    verifyArgs(args: Args, message: EternityMessage): Promise<void>;
    preParse(message: EternityMessage, parameters: string, context: CommandContext): Promise<Args>;
}
