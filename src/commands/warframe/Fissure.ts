import async from 'async';
import { capitalize } from 'lodash';
import { ApplyOptions } from '@sapphire/decorators';
import { replyLocalized } from '@sapphire/plugin-i18next';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { getModelForClass } from '@typegoose/typegoose';

import type { Message } from 'discord.js';

import { deleteMsgs, wait } from '#utils';
import { FissureTracker } from '#schemas';
import { placeHolder } from '../../lib/utils/placeHolder';

@ApplyOptions<SubCommandPluginCommandOptions>({
  preconditions: ['GuildOnly'],
  subCommands: ['enable', 'disable', 'reset'],
})
export default class extends SubCommandPluginCommand {
  private async setEnabled(msg: Message, value: boolean) {
    const result = await  getModelForClass(FissureTracker).updateOne(
      { enabled: !value, channel: msg.channel.id }, 
      { $set: { enabled: value } }, 
      { upsert: true },
    );

    const action = value ? 'enable' : 'disable';
    let reply: Message;
    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      reply = await replyLocalized(msg, `commands/Relics:${action}:already${capitalize(action)}d`);
    } else {
      reply = await replyLocalized(msg, `commands/Relics:${action}:success`);
    }

    await wait(15000);
    await deleteMsgs([reply, msg]);
  }

  public async enable(msg: Message) {
    await this.setEnabled(msg, true);
  }

  public async disable(msg: Message) {
    await this.setEnabled(msg, false);
  }

  public async reset(msg: Message) {
    const fissureTracker = await getModelForClass(FissureTracker)
      .findOneAndUpdate(
        { channel: msg.channel.id }, 
        { $set: { enabled: true } },
        { upsert: true, new: true },
      );
    const oldMessages = fissureTracker.messages;
    const messagesDeletion = Promise.all(oldMessages.map((id: string) => (
      msg.channel.messages.delete(id).catch(() => null))));

    const messages: string[] = await async.mapSeries(Array(5), async () => {
      const message = await msg.channel.send({ embeds: [placeHolder()] });

      return message.id;
    });
    await fissureTracker.updateOne({ $set: { messages } });
    await messagesDeletion;

    const sucessMsg = await replyLocalized(msg, 'commands/Relics:reset:success');
    await wait(15000);
    await deleteMsgs([sucessMsg, msg]);
  }
}
