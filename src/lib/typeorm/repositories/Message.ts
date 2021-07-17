import { EntityRepository, getConnection, getCustomRepository } from 'typeorm';

import type { EntityManager } from 'typeorm';

import { BaseRepository } from '#structures';
import { ChannelRepository } from '#repositories/Channel';
import { Message } from '#models';

import type { EternityMessage } from '#lib';

@EntityRepository(Message)
export class MessageRepository extends BaseRepository<Message> {
  public async findOrInsert(discordMessage: EternityMessage, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const messageRepo = entityManager.getCustomRepository(MessageRepository);

      let message = await messageRepo.find(discordMessage, onlyId);
      if (!message) {
        console.log(await this.insert(discordMessage, entityManager));

        message = await messageRepo.find(discordMessage, onlyId);
      }

      return message;
    });
  }

  public async insert(discordMessage: EternityMessage, manager?: EntityManager) {
    const channelRepo = manager
      ? manager.getCustomRepository(ChannelRepository)
      : getCustomRepository(ChannelRepository);

    const channel = await channelRepo.findOrInsert(discordMessage.channel, true);
    return this.createQueryBuilder('message')
      .insert()
      .values({ channel, snowflakeId: discordMessage.id })
      .execute();
  }

  public async find(discordMessage: EternityMessage, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordMessage)
        .select('message.id')
        .getOne();
    }

    return this.findQuery(discordMessage).getOne();
  }

  public findQuery(discordMessage: EternityMessage) {
    return this.createQueryBuilder('message')
      .where('message.snowflakeId = :messageId', { messageId: discordMessage.id });
  }
}
