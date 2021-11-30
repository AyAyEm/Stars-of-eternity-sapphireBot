import { EntityRepository, getConnection, getCustomRepository } from 'typeorm';

import type { EntityManager } from 'typeorm';
import type { Message as DiscordMessage, TextChannel } from 'discord.js';

import { BaseRepository } from '#structures';
import { ChannelRepo } from '#repositories/Channel';
import { Message } from '#models';

@EntityRepository(Message)
export class MessageRepo extends BaseRepository<Message> {
  public async findOrInsert(discordMessage: DiscordMessage, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const messageRepo = entityManager.getCustomRepository(MessageRepo);

      let message = await messageRepo.find(discordMessage, onlyId);
      if (!message) {
        await this.insert(discordMessage, entityManager);

        message = await messageRepo.find(discordMessage, onlyId);
      }

      return message;
    });
  }

  public async insert(discordMessage: DiscordMessage, manager?: EntityManager) {
    const channelRepo = manager
      ? manager.getCustomRepository(ChannelRepo)
      : getCustomRepository(ChannelRepo);

    const channel = await channelRepo.findOrInsert(discordMessage.channel as TextChannel, true);
    return this.createQueryBuilder('message')
      .insert()
      .values({ channel, id: discordMessage.id })
      .execute();
  }

  public async find(discordMessage: DiscordMessage, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordMessage)
        .select('message.id')
        .getOne();
    }

    return this.findQuery(discordMessage).getOne();
  }

  public findQuery(discordMessage: DiscordMessage) {
    return this.createQueryBuilder('message')
      .where('message.id = :messageId', { messageId: discordMessage.id });
  }
}
