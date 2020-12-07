import { Command, CommandOptions } from '@sapphire/framework';
import { CommandError } from '@lib/errors';
import type { Args, Awaited, PieceContext, ArgType } from '@sapphire/framework';
import type { EternityMessage } from '@lib';
import type { EternityClient } from './EternityClient';
declare type CommandRun = (message: EternityMessage, args: Args) => Awaited<void>;
export interface EternityCommandWSCOptions extends CommandOptions {
    requiredArgs?: [string, Array<keyof ArgType>][];
    defaultCommand?: string;
    enableDefault?: boolean;
    caseInsensitive?: boolean;
    subAliases?: [string, string[]][];
}
export declare abstract class EternityCommandWSC extends Command {
    #private;
    requiredArgs: Map<string, Array<keyof ArgType>>;
    subAliases: Map<string, Array<string>>;
    defaultCommand: EternityCommandWSCOptions['defaultCommand'];
    enableDefault: EternityCommandWSCOptions['enableDefault'];
    caseInsensitive: EternityCommandWSCOptions['caseInsensitive'];
    abstract subCommands: {
        [key: string]: CommandRun;
    };
    protected constructor(context: PieceContext, options: EternityCommandWSCOptions);
    get client(): EternityClient;
    protected get subCommandsList(): string[];
    onLoad(): Promise<void>;
    run(message: EternityMessage, args: Args): Promise<void>;
    error: (type: string, message: string) => CommandError;
    preParse(message: EternityMessage, parameters: string): Promise<Args>;
    verifyArgs(args: Args, message: EternityMessage): Promise<Args>;
}
export {};
