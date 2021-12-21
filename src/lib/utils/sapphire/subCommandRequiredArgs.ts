import async from 'async';

import { Args, Command, CommandOptions, ArgType } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import { SubCommandEntry } from '@sapphire/plugin-subcommands';

import { list } from '#utils';

export function subCommandRequiredArgs(command: string, requiredArgs: Array<keyof ArgType>) {
  return async (context: SubCommandEntry.MessageRunContext<Args, Command<Args, CommandOptions>>) => {
    const missingArguments = (await async.filterSeries(requiredArgs, async (argType) => {
      const argIsPassed = (await context.args.pickResult(argType)).success;

      return !argIsPassed;
    }));

    if (missingArguments.length > 0) {
      sendLocalized(context.message.channel, { keys:'missingArgument', formatOptions: { args: missingArguments } });
      throw this.error(
        'missingArgument',
        `The argument(s) ${list(missingArguments, 'and')} was missing.`,
      );
    } else {
      return command;
    }
  };
}
