import { Collection } from 'discord.js';
import { Command, CommandOptions } from '@sapphire/framework';
import { CommandError } from "./errors";
import type { Args, PieceContext, ArgType, CommandContext } from '@sapphire/framework';
import type { EternityMessage } from "./";
import type { EternityClient } from './EternityClient';
export interface ArgSwitch {
    name: keyof ArgType;
    orFlags?: string[];
}
export interface SubCommand {
    name: string;
    aliases?: string[];
    flags?: string[];
    requiredArgs?: Array<(keyof ArgType) | ArgSwitch>;
    default?: boolean;
}
export interface EternityCommandWSCOptions extends CommandOptions {
    subCommands?: (SubCommand | string)[];
    caseInsensitive?: boolean;
}
export declare abstract class EternityCommandWSC extends Command {
    #private;
    subCommands: Collection<string, SubCommand>;
    caseInsensitive: boolean;
    defaultCommand: string | null;
    protected constructor(context: PieceContext, options: EternityCommandWSCOptions);
    get client(): EternityClient;
    run(message: EternityMessage, args: Args): Promise<void>;
    error: (identifier: string, message: string) => CommandError;
    preParse(message: EternityMessage, parameters: string, context: CommandContext): Promise<Args>;
    verifyArgs(args: Args, message: EternityMessage): Promise<Args>;
    findSubCommand(subCommandName: string): SubCommand;
}
