import { EntityRepository, getConnection } from 'typeorm';

import { TextChannel } from 'discord.js';

import { BaseRepository } from '#structures';
import { WarframeFissureTracker } from '#models';
import { ChannelRepo } from '#repositories/Channel';
import { MessageRepo } from '#repositories/Message';
import { placeHolder } from '#utils';

@EntityRepository(WarframeFissureTracker)
export class WarframeFissureTrackerRepo extends BaseRepository<WarframeFissureTracker> {
  private tiers = Array.from({ length: 5 }, (_, i) => i + 1);

  public async findOrInsertAll(discordChannel: TextChannel, onlyId?: boolean) {
    const fissureTrackers: WarframeFissureTracker[] = [];
    for (const tier of this.tiers) {
      // eslint-disable-next-line no-await-in-loop
      fissureTrackers.push(await this.findOrInsert(discordChannel, tier, onlyId));
    }

    return fissureTrackers;
  }

  public async findOrInsert(discordChannel: TextChannel, tier: number, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const fissureTrackerRepo = entityManager.getCustomRepository(WarframeFissureTrackerRepo);

      let fissure = await fissureTrackerRepo.find(discordChannel, tier, onlyId);
      if (!fissure) {
        const channelRepo = entityManager.getCustomRepository(ChannelRepo);
        const messageRepo = entityManager.getCustomRepository(MessageRepo);

        const channel = await channelRepo.findOrInsert(discordChannel, true);

        const discordMessage = await discordChannel.send({ embeds: [placeHolder()] });
        await messageRepo.insert(discordMessage, entityManager);
        const message = await messageRepo.find(discordMessage, true);

        await fissureTrackerRepo.createQueryBuilder('fissureTracker')
          .insert()
          .values({ tier, channel, message })
          .execute();

        fissure = await fissureTrackerRepo.find(discordChannel, tier, onlyId);
      }

      return fissure;
    });
  }

  public async findAll(discordChannel: TextChannel, onlyId?: boolean) {
    return Promise.all(this.tiers.map((tier) => this.find(discordChannel, tier, onlyId)));
  }

  public async find(discordChannel: TextChannel, tier: number, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordChannel, tier)
        .select('fissureTracker.id')
        .getOne();
    }

    return this.findQuery(discordChannel, tier).getOne();
  }

  public findQuery(discordChannel: TextChannel, tier: number) {
    return this.createQueryBuilder('fissureTracker')
      .leftJoin('fissureTracker.channel', 'channel')
      .where('channel.id = :channelId', { channelId: discordChannel.id })
      .andWhere('fissureTracker.tier = :tier', { tier });
  }

  public async delete(fissureTrackers: WarframeFissureTracker[]) {
    return this.createQueryBuilder()
      .delete()
      .where('fissure_tracker.id IN (:...fissureIds)', { fissureIds: fissureTrackers.map(({ id }) => id) })
      .execute();
  }
}
