import { EntityRepository, getConnection } from 'typeorm';

import { BaseRepository } from '#structures';
import { Channel } from '#models';
import { GuildRepository } from './Guild';

import type { EternityTextChannel } from '#lib';

@EntityRepository(Channel)
export class ChannelRepository extends BaseRepository<Channel> {
  public async findOrInsert(discordChannel: EternityTextChannel, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const channelsRepo = entityManager.getCustomRepository(ChannelRepository);
      let channel = await channelsRepo.find(discordChannel, onlyId);

      if (!channel) {
        const guildRepo = entityManager.getCustomRepository(GuildRepository);
        const guild = await guildRepo.findOrInsert(discordChannel.guild, true);

        await entityManager.createQueryBuilder()
          .insert()
          .into(Channel)
          .values([{ snowflakeId: discordChannel.id, name: discordChannel.name, guild }])
          .execute();

        channel = await channelsRepo.find(discordChannel, onlyId);

        // await entityManager.createQueryBuilder()
        //   .relation(Channel, 'guild')
        //   .of(channel)
        //   .set(guild);
      }

      return channel;
    });
  }

  public async find(discordChannel: EternityTextChannel, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordChannel)
        .select('channel.id')
        .getOne();
    }

    return this.findQuery(discordChannel).getOne();
  }

  public findQuery(discordChannel: EternityTextChannel) {
    return this.createQueryBuilder('channel')
      .where('channel.snowflakeId = :channelId', { channelId: discordChannel.id });
  }
}
