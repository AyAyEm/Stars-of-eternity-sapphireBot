import { Args, Command, CommandOptions, ArgType } from '@sapphire/framework';
import { SubCommandEntry } from '@sapphire/plugin-subcommands';
export declare function subCommandRequiredArgs(command: string, requiredArgs: Array<keyof ArgType>): (context: SubCommandEntry.MessageRunContext<Args, Command<Args, CommandOptions>>) => Promise<string>;
