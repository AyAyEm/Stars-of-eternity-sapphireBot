import { Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';

import type { TextChannel } from 'discord.js';

import { fissuresEmbed } from '#lib/embeds/warframe/FissureTracker';
import { FissureTracker } from '#schemas';

import type { Fissure as WarframeFissure } from '#lib/types/Warframe';

@ApplyOptions<Listener.Options>({ event: 'warframeNewActiveFissures' })
export default class extends Listener {
  public async run(fissures: WarframeFissure[]) {
    const FissureTrackerModel = getModelForClass(FissureTracker);

    const fissuresEmbeds = fissuresEmbed(fissures);
    await FissureTrackerModel
      .find({ enabled: true }, { _id: 0, messages: 1, channel: 1 })
      .cursor()
      .eachAsync(async (fissureTracker: DocumentType<FissureTracker>) => {
        const channelId = fissureTracker.channel;
        const channel = await this.container.client.channels.fetch(channelId) as TextChannel;
        await Promise.all(fissureTracker.messages.map(async (messageId, tier) => {
          const embed = fissuresEmbeds.get(tier + 1);
          if (!messageId || !embed) return;

          const message = await channel.messages.fetch(messageId);
          await message.edit({ embeds: [embed] });
        }).map((p) => p.catch((e) => this.container.client.logger.error(e))));
      }).catch((e) => this.container.client.logger.error(e));
  }
}
