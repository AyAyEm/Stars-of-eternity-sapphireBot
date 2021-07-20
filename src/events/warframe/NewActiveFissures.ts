import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository } from 'typeorm';

import type { EventOptions } from '@sapphire/framework';

import { EternityEvent } from '#lib';
import { fissuresEmbed } from '#lib/embeds/warframe/FissureTracker';
import { FissureTrackerRepository } from '#repositories';

import type { EternityTextChannel } from '#lib';
import type { Fissure as WarframeFissure } from '#lib/types/Warframe';

@ApplyOptions<EventOptions>({ event: 'warframeNewActiveFissures' })
export default class extends EternityEvent<'warframeNewActiveFissures'> {
  public async run(fissures: WarframeFissure[]) {
    const fissureTrackerRepo = getCustomRepository(FissureTrackerRepository);

    const fissureTrackers = await fissureTrackerRepo.createQueryBuilder('fissureTracker')
      .where('fissureTracker.enabled = :enabled', { enabled: true })
      .stream();

    const fissuresEmbeds = fissuresEmbed(fissures);
    const handler = (data: { fissureTracker_id: number }) => (async () => {
      const fissureTracker = await fissureTrackerRepo.createQueryBuilder('fissureTracker')
        .leftJoinAndSelect('fissureTracker.channel', 'channel')
        .leftJoinAndSelect('fissureTracker.message', 'message')
        .where('fissureTracker.id = :fissureTrackerId', { fissureTrackerId: data.fissureTracker_id })
        .getOne();

      const embed = fissuresEmbeds.get(fissureTracker.tier);
      if (!embed) return;

      const channel = await this.client.channels
        .fetch(fissureTracker.channel.id) as EternityTextChannel;

      const message = await channel.messages.fetch(fissureTracker.message.id);

      await message.edit(embed);
    })().catch((e) => this.client.console.error(e));

    fissureTrackers.on('data', handler);
  }
}
