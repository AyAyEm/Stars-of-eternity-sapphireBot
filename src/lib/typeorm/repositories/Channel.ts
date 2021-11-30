import { EntityRepository, getConnection } from 'typeorm';

import { GuildChannel } from 'discord.js';

import { BaseRepository } from '#structures';
import { Channel } from '#models';
import { GuildRepo } from './Guild';

@EntityRepository(Channel)
export class ChannelRepo extends BaseRepository<Channel> {
  public async findOrInsert(discordChannel: GuildChannel, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const channelsRepo = entityManager.getCustomRepository(ChannelRepo);
      let channel = await channelsRepo.find(discordChannel, onlyId);

      if (!channel) {
        const guildRepo = entityManager.getCustomRepository(GuildRepo);
        const guild = await guildRepo.findOrInsert(discordChannel.guild, true);

        await entityManager.createQueryBuilder()
          .insert()
          .into(Channel)
          .values([{ id: discordChannel.id, name: discordChannel.name, guild }])
          .execute();

        channel = await channelsRepo.find(discordChannel, onlyId);
      }

      return channel;
    });
  }

  public async find(discordChannel: GuildChannel, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordChannel)
        .select('channel.id')
        .getOne();
    }

    return this.findQuery(discordChannel).getOne();
  }

  public findQuery(discordChannel: GuildChannel) {
    return this.createQueryBuilder('channel')
      .where('channel.id = :channelId', { channelId: discordChannel.id });
  }
}
