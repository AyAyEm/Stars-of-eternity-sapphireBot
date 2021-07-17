import { capitalize } from 'lodash';
import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository } from 'typeorm';

import { EternityCommandWSC } from '#lib';
import { FissureTrackerRepository } from '#repositories';
import { deleteMsgs } from '#utils';

import type { EternityCommandWSCOptions, EternityMessage, EternityTextChannel } from '#lib';

@ApplyOptions<EternityCommandWSCOptions>({
  preconditions: ['GuildOnly'],
  subCommands: ['enable', 'disable', 'reset'],
})
export default class extends EternityCommandWSC {
  private get fissureTrackerRepo() {
    return getCustomRepository(FissureTrackerRepository);
  }

  private async setEnabled(msg: EternityMessage, value: boolean) {
    const { fissureTrackerRepo } = this;
    const fissureTrackers = await fissureTrackerRepo.findOrInsertAll(msg.channel);
    const toUpdateTrackers = fissureTrackers.filter(({ enabled }) => (value ? !enabled : enabled));

    const action = value ? 'enable' : 'disable';
    if (toUpdateTrackers.length <= 0) {
      const reply = msg.replyTranslated(`commands/Relics:${action}:already${capitalize(action)}d`);
      await deleteMsgs([reply, msg], { timeout: 15000 });
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

    const reply = await msg.replyTranslated(`commands/Relics:${action}:success`);

    await deleteMsgs([reply, msg], { timeout: 15000 });
  }

  public async enable(msg: EternityMessage) {
    await this.setEnabled(msg, true);
  }

  public async disable(msg: EternityMessage) {
    await this.setEnabled(msg, false);
  }

  public async reset(msg: EternityMessage) {
    const fissureTrackers = await this.fissureTrackerRepo
      .createQueryBuilder('fissure')
      .leftJoinAndSelect('fissure.message', 'message')
      .leftJoinAndSelect('fissure.channel', 'channel')
      .where('channel.snowflakeId = :channelId', { channelId: msg.channel.id })
      .getMany();

    const { fissureTrackerRepo } = this;
    if (fissureTrackers.length > 0) {
      const messagesDeletion = Promise.all(fissureTrackers.map(async (fissureTracker) => {
        const channel = await this.client.channels
          .fetch(fissureTracker.channel.snowflakeId) as EternityTextChannel;

        const message = await channel.messages
          .fetch(fissureTracker.message.snowflakeId).catch(() => null);

        await message?.delete().catch(() => null);
      }));

      await fissureTrackerRepo.delete(fissureTrackers);
      await messagesDeletion;
    }

    await fissureTrackerRepo.findOrInsertAll(msg.channel, true);
    await deleteMsgs([msg.replyTranslated('commands/Relics:reset:success'), msg], { timeout: 15000 });
  }
}
