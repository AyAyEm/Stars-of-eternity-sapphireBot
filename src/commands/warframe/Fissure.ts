import { capitalize } from 'lodash';
import { getCustomRepository } from 'typeorm';
import { ApplyOptions } from '@sapphire/decorators';
import { replyLocalized } from '@sapphire/plugin-i18next';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';

import type { Message, TextChannel } from 'discord.js';

import { WarframeFissureTrackerRepo } from '#repositories';
import { deleteMsgs, wait } from '#utils';

@ApplyOptions<SubCommandPluginCommandOptions>({
  preconditions: ['GuildOnly'],
  subCommands: ['enable', 'disable', 'reset'],
})
export default class extends SubCommandPluginCommand {
  private get fissureTrackerRepo() {
    return getCustomRepository(WarframeFissureTrackerRepo);
  }

  private async setEnabled(msg: Message, value: boolean) {
    const { fissureTrackerRepo } = this;
    const fissureTrackers = await fissureTrackerRepo.findOrInsertAll(msg.channel as TextChannel);
    const toUpdateTrackers = fissureTrackers.filter(({ enabled }) => (value ? !enabled : enabled));

    const action = value ? 'enable' : 'disable';
    if (toUpdateTrackers.length <= 0) {
      const reply =  replyLocalized(msg, `commands/Relics:${action}:already${capitalize(action)}d`);
      await wait(15000);
      await deleteMsgs([reply, msg]);
      return;
    }

    await fissureTrackerRepo.createQueryBuilder('fissureTracker')
      .update()
      .set({ enabled: value })
      .where(
        'fissure_tracker.id IN (:...trackerIds)',
        { trackerIds: toUpdateTrackers.map(({ id }) => id) },
      )
      .execute();

      
    const reply = await replyLocalized(msg, `commands/Relics:${action}:success`);

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
    const fissureTrackers = await this.fissureTrackerRepo
      .createQueryBuilder('fissure')
      .leftJoinAndSelect('fissure.message', 'message')
      .leftJoinAndSelect('fissure.channel', 'channel')
      .where('channel.id = :channelId', { channelId: msg.channel.id })
      .getMany();

    const { fissureTrackerRepo } = this;
    if (fissureTrackers.length > 0) {
      const messagesDeletion = Promise.all(fissureTrackers.map(async (fissureTracker) => {
        const channel = await msg.client.channels
          .fetch(fissureTracker.channel.id) as TextChannel;

        const message = await channel.messages
          .fetch(fissureTracker.message.id).catch(() => null);

        await message?.delete().catch(() => null);
      }));

      await fissureTrackerRepo.delete(fissureTrackers);
      await messagesDeletion;
    }

    await fissureTrackerRepo.findOrInsertAll(msg.channel as TextChannel, true);
    await wait(15000);
    await deleteMsgs([replyLocalized(msg, 'commands/Relics:reset:success'), msg]);
  }
}
