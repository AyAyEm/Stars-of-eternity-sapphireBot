import async from 'async';
import { Collection } from 'discord.js';
import { Command, CommandOptions } from '@sapphire/framework';
import { list } from '@utils/LanguageFunctions';
import { CommandError } from '@lib/errors';

import type { Args, PieceContext, ArgType, CommandContext } from '@sapphire/framework';

import type { EternityMessage } from '@lib';

import { CaseInsensitiveMap } from '#structures';

import type { EternityClient } from './EternityClient';

export interface SubCommand {
  name: string;
  aliases?: string[];
  requiredArgs?: (keyof ArgType)[];
  default?: boolean;
}

export interface EternityCommandWSCOptions extends CommandOptions {
  subCommands?: (SubCommand | string)[];
  caseInsensitive?: boolean;
}

export abstract class EternityCommandWSC extends Command {
  public subCommands: Collection<string, SubCommand>;

  public caseInsensitive: boolean;

  #subCommandsDict?: Map<string, string>;

  public defaultCommand: string | null;

  protected constructor(context: PieceContext, options: EternityCommandWSCOptions) {
    super(context, options);

    this.caseInsensitive = options.caseInsensitive ?? true;

    if (options.subCommands) {
      this.subCommands = new Collection(options.subCommands?.map((subCommand) => {
        if (typeof subCommand === 'string') {
          return [subCommand, { name: subCommand }];
        }

        return [subCommand.name, subCommand];
      }));

      if (this.caseInsensitive) {
        const subCommandsEntries = [
          ...options.subCommands.flatMap((sb): [string, string][] => {
            let aliases: string[] = [];
            let name: string;
            if (typeof sb === 'string') {
              name = sb;
            } else {
              name = sb.name;
              aliases = sb.aliases ?? [];
            }

            return [[name, name], ...aliases.map<[string, string]>((alias) => [alias, name])];
          })];

        this.#subCommandsDict = new CaseInsensitiveMap(subCommandsEntries);
      }
    } else {
      this.subCommands = new Collection();
    }
    this.defaultCommand = this.subCommands.find((subCommand) => subCommand?.default)?.name ?? null;
  }

  public get client(): EternityClient {
    return super.context.client as EternityClient;
  }

  public async run(message: EternityMessage, args: Args) {
    const subCommandName = await args.pickResult('string')
      .then((result) => {
        const subCommand = result.success ? this.findSubCommand(result.value) : null;
        if (subCommand) {
          args.save();
          return subCommand.name;
        }

        args.start();
        return this.defaultCommand;
      });

    try {
      await this[subCommandName](message, args);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  public error = (identifier: string, message: string) => new CommandError({ identifier, message });

  public async preParse(message: EternityMessage, parameters: string, context: CommandContext) {
    const args = await super.preParse(message, parameters, context);
    await this.verifyArgs(args, message);
    return args.start();
  }

  public async verifyArgs(args: Args, message: EternityMessage) {
    const subCommandName = await args.pickResult('string')
      .then((result) => (result.success ? result.value : this.defaultCommand));

    const subCommand = this.findSubCommand(subCommandName);
    if (subCommand) {
      const requiredArgs = subCommand.requiredArgs ?? [];

      const missingArguments = await async.filterSeries(requiredArgs, async (arg) => (
        !(await args.pickResult(arg)).success));

      if (missingArguments.length > 0) {
        message.channel.sendTranslated('missingArgument', [{ args: missingArguments }]);
        throw this.error(
          'missingArgument',
          `The argument(s) ${list(missingArguments, 'and')} was missing.`,
        );
      }
    } else {
      const subCommandNames = this.subCommands.map(({ name }) => name);

      message.channel.sendTranslated('missingSubCommand', [{ args: subCommandNames }]);
      throw this.error(
        'missingSubCommand',
        `The subcommand ${list(subCommandNames, 'or')} was missing.`,
      );
    }
    return args.start();
  }

  public findSubCommand(subCommandName: string) {
    if (this.caseInsensitive) {
      return this.subCommands.get(this.#subCommandsDict.get(subCommandName));
    }

    return this.subCommands.get(subCommandName);
  }
}
