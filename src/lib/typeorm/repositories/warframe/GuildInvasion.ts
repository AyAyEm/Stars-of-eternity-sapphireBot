import { EntityRepository, getConnection } from 'typeorm';

import { BaseRepository } from '#structures';
import { GuildInvasion } from '#models';

import { ChannelRepository } from '#repositories/Channel';

import type { EternityTextChannel } from '#lib';
import type { Item } from '#models';

@EntityRepository(GuildInvasion)
export class GuildInvasionRepository extends BaseRepository<GuildInvasion> {
  public async findOrInsert(discordChannel: EternityTextChannel, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const guildInvasionsRepo = entityManager.getCustomRepository(GuildInvasionRepository);
      let guildInvasion: GuildInvasion = await guildInvasionsRepo
        .findByChannel(discordChannel, onlyId);

      if (!guildInvasion) {
        const channelRepo = entityManager.getCustomRepository(ChannelRepository);
        const channel = await channelRepo.findOrInsert(discordChannel);

        await entityManager.createQueryBuilder()
          .insert()
          .into(GuildInvasion)
          .values([{ channel }])
          .execute();

        guildInvasion = await guildInvasionsRepo.findByChannel(discordChannel, onlyId);
      }

      return guildInvasion;
    });
  }

  public async findByChannel(discordChannel: EternityTextChannel, onlyId = false) {
    const query = await this.findByChannelQuery(discordChannel);

    if (onlyId) {
      return query
        .select('guildInvasion.id')
        .getOne();
    }

    return query.getOne();
  }

  public async findByChannelQuery(discordChannel: EternityTextChannel) {
    return this.createQueryBuilder('guildInvasion')
      .leftJoinAndSelect('guildInvasion.channel', 'channel')
      .where('channel.snowflakeId = :channelId', { channelId: discordChannel.id });
  }

  public async findItemsByChannel(discordChannel: EternityTextChannel) {
    const guildInvasion = await this.findByChannel(discordChannel, true);

    return (await this
      .createQueryBuilder()
      .relation(GuildInvasion, 'items')
      .of(guildInvasion)
      .loadMany<Item>()) ?? [];
  }
}
