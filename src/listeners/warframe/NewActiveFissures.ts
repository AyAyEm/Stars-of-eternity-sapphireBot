import { Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository } from 'typeorm';

import type { TextChannel } from 'discord.js';

import { fissuresEmbed } from '#lib/embeds/warframe/FissureTracker';
import { WarframeFissureTrackerRepo } from '#repositories';

import type { Fissure as WarframeFissure } from '#lib/types/Warframe';

@ApplyOptions<Listener.Options>({ event: 'warframeNewActiveFissures' })
export default class extends Listener {
  public async run(fissures: WarframeFissure[]) {
    const fissureTrackerRepo = getCustomRepository(WarframeFissureTrackerRepo);

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

      const channel = await this.container.client.channels.fetch(fissureTracker.channel.id) as TextChannel; 

      const message = await channel.messages.fetch(fissureTracker.message.id);

      await message.edit({ embeds: [embed] });
    })().catch((e) => this.container.client.logger.error(e));

    fissureTrackers.on('data', handler);
  }
}
