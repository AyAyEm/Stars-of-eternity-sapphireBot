import { EternityEvent } from '@lib';
import { ApplyOptions } from '@sapphire/decorators';
import { Guilds } from '@providers/mongoose/models';
import { fissuresEmbed } from '@embeds/warframe/FissureTracker';
import { Schema } from 'mongoose';

import type { RelicTracker } from '@providers/mongoose/models';
import type { EventOptions } from '@sapphire/framework';
import type { Fissure, RelicTiers } from '@lib/types/Warframe';
import type { EternityMessageEmbed } from '@lib';
import type { TextChannel, Collection, Message } from 'discord.js';

@ApplyOptions<EventOptions>({ event: 'warframeNewActiveFissures' })
export default class extends EternityEvent<'warframeNewActiveFissures'> {
  public async run(fissures: Fissure[]) {
    const fissuresEmbeds = fissuresEmbed(fissures);
    this.client.provider.models.Guilds.find({}).cursor()
      .on('data', async ({ channels, id: guildId }: Guilds) => {
        if (!channels) return;
        const guildDocument = await new this.client.provider.Guilds(guildId).load;

        channels.forEach(async ({ relicTracker }, channelId) => {
          if (!relicTracker || !relicTracker.enabled) return;
          const messagesPath = `channels.${channelId}.relicTracker.messages`;
          const messages = await guildDocument.get<RelicTracker['messages']>(messagesPath, Schema.Types.Map);

          const channel = await this.client.channels.fetch(channelId) as TextChannel;
          const undefinedMessage = async (embed: EternityMessageEmbed, tier: RelicTiers) => {
            const sentMessage = await channel.send(embed);
            messages.set(tier, sentMessage.id);
          };

          for await (const [tier, embed] of fissuresEmbeds) {
            if (!messages.has(tier)) {
              await undefinedMessage(embed, tier);
            } else {
              const messageId = messages.get(tier);
              await channel.messages.fetch(messageId)
                .then(async (oldMessage) => {
                  if (oldMessage) {
                    await (
                      (oldMessage as unknown as Collection<string, Message>).first().edit(embed));
                  } else {
                    await undefinedMessage(embed, tier);
                  }
                })
                .catch((e) => {
                  console.error(e);
                  undefinedMessage(embed, tier);
                });
            }
          }

          await guildDocument.set(messagesPath, messages);
        });
      });
  }
}
