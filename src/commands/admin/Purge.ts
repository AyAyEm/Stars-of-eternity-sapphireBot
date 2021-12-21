import { Args } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { replyLocalized, sendLocalized } from '@sapphire/plugin-i18next';

import type { Message } from 'discord.js';

import { EternityCommand, EternityCommandOptions } from '#lib';

@ApplyOptions<EternityCommandOptions>({
  preconditions: ['OwnerOnly'],
  requiredArgs: ['number'],
})
export default class extends EternityCommand {
  public async messageRun(msg: Message, args: Args) {
    const ammount = await args.pick('number');

    if (ammount >= 100) {
      replyLocalized(msg, 'commands/Purge:exceededLimit');
    } else {
      if (msg.channel.type === 'DM') return;
      msg.channel.bulkDelete(Number(ammount) + 1)
        .catch((err: Error) => sendLocalized(
          msg.channel, 
          { keys: 'commands/Purge:error', formatOptions: { err: err.message } },
        ));
    }
  }
}
