import { EntityRepository, getConnection } from 'typeorm';

import { BaseRepository } from '#structures';
import { FissureTracker } from '#models';
import { ChannelRepository } from '#repositories/Channel';
import { MessageRepository } from '#repositories/Message';
import { placeHolder } from '#utils';

import type { EternityTextChannel, EternityMessage } from '#lib';

@EntityRepository(FissureTracker)
export class FissureTrackerRepository extends BaseRepository<FissureTracker> {
  private tiers = Array.from({ length: 5 }, (_, i) => i + 1);

  public async findOrInsertAll(discordChannel: EternityTextChannel, onlyId?: boolean) {
    const fissureTrackers: FissureTracker[] = [];
    for (const tier of this.tiers) {
      // eslint-disable-next-line no-await-in-loop
      fissureTrackers.push(await this.findOrInsert(discordChannel, tier, onlyId));
    }

    return fissureTrackers;
  }

  public async findOrInsert(discordChannel: EternityTextChannel, tier: number, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const fissureTrackerRepo = entityManager.getCustomRepository(FissureTrackerRepository);

      let fissure = await fissureTrackerRepo.find(discordChannel, tier, onlyId);
      if (!fissure) {
        const channelRepo = entityManager.getCustomRepository(ChannelRepository);
        const messageRepo = entityManager.getCustomRepository(MessageRepository);

        const channel = await channelRepo.findOrInsert(discordChannel, true);

        const discordMessage = await discordChannel.send(placeHolder()) as EternityMessage;
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

  public async findAll(discordChannel: EternityTextChannel, onlyId?: boolean) {
    return Promise.all(this.tiers.map((tier) => this.find(discordChannel, tier, onlyId)));
  }

  public async find(discordChannel: EternityTextChannel, tier: number, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordChannel, tier)
        .select('fissureTracker.id')
        .getOne();
    }

    return this.findQuery(discordChannel, tier).getOne();
  }

  public findQuery(discordChannel: EternityTextChannel, tier: number) {
    return this.createQueryBuilder('fissureTracker')
      .leftJoin('fissureTracker.channel', 'channel')
      .where('channel.id = :channelId', { channelId: discordChannel.id })
      .andWhere('fissureTracker.tier = :tier', { tier });
  }

  public async delete(fissureTrackers: FissureTracker[]) {
    return this.createQueryBuilder()
      .delete()
      .where('fissure_tracker.id IN (:...fissureIds)', { fissureIds: fissureTrackers.map(({ id }) => id) })
      .execute();
  }
}
