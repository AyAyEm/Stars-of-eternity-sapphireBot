import { EntityRepository, getConnection } from 'typeorm';

import { BaseRepository } from '#structures';
import { InvasionTracker } from '#models';

import { ChannelRepository } from '#repositories/Channel';

import type { EternityTextChannel } from '#lib';
import type { Item } from '#models';

@EntityRepository(InvasionTracker)
export class InvasionTrackerRepository extends BaseRepository<InvasionTracker> {
  public async findOrInsert(discordChannel: EternityTextChannel, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const invasionTrackerRepo = entityManager.getCustomRepository(InvasionTrackerRepository);
      let invasionTracker: InvasionTracker = await invasionTrackerRepo
        .findByChannel(discordChannel, onlyId);

      if (!invasionTracker) {
        const channelRepo = entityManager.getCustomRepository(ChannelRepository);
        const channel = await channelRepo.findOrInsert(discordChannel);

        await entityManager.createQueryBuilder()
          .insert()
          .into(InvasionTracker)
          .values([{ channel }])
          .execute();

        invasionTracker = await invasionTrackerRepo.findByChannel(discordChannel, onlyId);
      }

      return invasionTracker;
    });
  }

  public async findByChannel(discordChannel: EternityTextChannel, onlyId = false) {
    const query = await this.findByChannelQuery(discordChannel);

    if (onlyId) {
      return query
        .select('invasionTracker.id')
        .getOne();
    }

    return query.getOne();
  }

  public async findByChannelQuery(discordChannel: EternityTextChannel) {
    return this.createQueryBuilder('invasionTracker')
      .leftJoinAndSelect('invasionTracker.channel', 'channel')
      .where('channel.id = :channelId', { channelId: discordChannel.id });
  }

  public async findItemsByChannel(discordChannel: EternityTextChannel) {
    const invasionTracker = await this.findByChannel(discordChannel, true);

    return (await this
      .createQueryBuilder()
      .relation(InvasionTracker, 'items')
      .of(invasionTracker)
      .loadMany<Item>()) ?? [];
  }
}
