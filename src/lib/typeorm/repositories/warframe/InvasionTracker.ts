import { EntityRepository, getConnection } from 'typeorm';

import { GuildChannel } from 'discord.js';

import { BaseRepository } from '#structures';
import { WarframeInvasionTracker, WarframeItem } from '#models';
import { ChannelRepo } from '#repositories/Channel';

@EntityRepository(WarframeInvasionTracker)
export class WarframeInvasionTrackerRepo extends BaseRepository<WarframeInvasionTracker> {
  public async findOrInsert(discordChannel: GuildChannel, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const invasionTrackerRepo = entityManager.getCustomRepository(WarframeInvasionTrackerRepo);
      let invasionTracker: WarframeInvasionTracker = await invasionTrackerRepo
        .findByChannel(discordChannel, onlyId);

      if (!invasionTracker) {
        const channelRepo = entityManager.getCustomRepository(ChannelRepo);
        const channel = await channelRepo.findOrInsert(discordChannel);

        await entityManager.createQueryBuilder()
          .insert()
          .into(WarframeInvasionTracker)
          .values([{ channel }])
          .execute();

        invasionTracker = await invasionTrackerRepo.findByChannel(discordChannel, onlyId);
      }

      return invasionTracker;
    });
  }

  public async findByChannel(discordChannel: GuildChannel, onlyId = false) {
    const query = await this.findByChannelQuery(discordChannel);

    if (onlyId) {
      return query
        .select('invasionTracker.id')
        .getOne();
    }

    return query.getOne();
  }

  public async findByChannelQuery(discordChannel: GuildChannel) {
    return this.createQueryBuilder('invasionTracker')
      .leftJoinAndSelect('invasionTracker.channel', 'channel')
      .where('channel.id = :channelId', { channelId: discordChannel.id });
  }

  public async findItemsByChannel(discordChannel: GuildChannel) {
    const invasionTracker = await this.findByChannel(discordChannel, true);

    return (await this
      .createQueryBuilder()
      .relation(WarframeInvasionTracker, 'items')
      .of(invasionTracker)
      .loadMany<WarframeItem>()) ?? [];
  }
}
