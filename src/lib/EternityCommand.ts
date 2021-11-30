import {
  Command,
  PieceContext,
  CommandOptions,
} from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';

import async from 'async';

import type { Message } from 'discord.js';
import type { Args, ArgType, CommandContext } from '@sapphire/framework';

import { list } from '#utils';
import { CommandError } from './errors';

export interface EternityCommandOptions extends CommandOptions {
  requiredArgs?: Array<keyof ArgType>;
}

export abstract class EternityCommand extends Command {
  public requiredArgs: EternityCommandOptions['requiredArgs'];

  protected constructor(context: PieceContext, options: EternityCommandOptions) {
    super(context, options);
    this.requiredArgs = options.requiredArgs ?? [];
  }

  public error = (identifier: string, message: string) => new CommandError({ identifier, message });

  public async verifyArgs(args: Args, message: Message) {
    const missingArguments = await async.filter(this.requiredArgs, async (arg) => (
      !(await args.pickResult(arg)).success));

    if (missingArguments.length > 0) {
      await sendLocalized(message, { keys: 'missingArgument', formatOptions: { args: missingArguments } });
      throw this.error(
        'missingArgument',
        `The argument(s) ${list(missingArguments, 'and')} was missing.`,
      );
    }
  }

  public async preParse(message: Message, parameters: string, context: CommandContext) {
    const args = await super.preParse(message, parameters, context);
    if (this.requiredArgs.length > 0) await this.verifyArgs(args, message);
    return args.start();
  }
}
