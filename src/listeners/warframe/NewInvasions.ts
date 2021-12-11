import { MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';

import type { TextChannel } from 'discord.js';

import { CaseInsensitiveSet } from '#lib/structures';
import { InvasionTracker, Item } from '#schemas';
import { Warframe } from '#utils';

import type { InvasionData, Reward } from '#lib/types/Warframe';

@ApplyOptions<ListenerOptions>({ event: 'warframeNewInvasions' })
export default class extends Listener {
  public async run(invasions: InvasionData[]) {
    await getModelForClass(InvasionTracker)
      .find({ enabled: true })
      .populate('items')
      .cursor()
      .eachAsync(async (invasionTracker: DocumentType<InvasionTracker>) => {
        if (invasionTracker.items.length > 0) {
          const itemNames = new CaseInsensitiveSet(invasionTracker.items.map(({ name }: Item) => name));

          const channelId = invasionTracker.channel;
          await Promise.all(invasions
            .filter(({ rewardTypes }) => rewardTypes.find((itemName) => itemNames.has(itemName)))
            .map(async (invasion) => {
              const items = invasion.rewardTypes.filter((itemName) => itemNames.has(itemName));

              const embeds = this.makeEmbeds(invasion, items);
              const discordChannel = await this.container.client.channels.fetch(channelId) as TextChannel;
              await discordChannel.send({ embeds: embeds });
            }));
        }
      }).catch((e) => this.container.client.logger.error(e));
  }

  private makeEmbeds(invasion: InvasionData, matchedItems: string[]): MessageEmbed[] {
    function embedMaker([reward, ...factions]: [Reward, string, string]) {
      const { factionsStyle } = Warframe;

      return new MessageEmbed()
        .setTitle(`${reward.itemString}`)
        .setThumbnail(reward.thumbnail)
        .setTimestamp()
        .setColor(factionsStyle.get(factions[0])?.color || 'WHITE')
        .setAuthor(`${invasion.node} ${invasion.desc}`, factionsStyle.get(factions[0])?.tumb)
        .setFooter(`${factions[0]} x ${factions[1]}`, factionsStyle.get(factions[1])?.tumb);
    }

    const embeds = new Set<MessageEmbed>();
    const {
      attackingFaction,
      defendingFaction,
      attackerReward,
      defenderReward,
      rewardTypes,
    } = invasion;

    if (attackingFaction === 'Infested') {
      embeds.add(embedMaker([defenderReward, attackingFaction, defendingFaction]));
      if (matchedItems.length === 1) return [...embeds];
    }

    if (matchedItems.includes(rewardTypes[0])) {
      embeds.add(embedMaker([attackerReward, attackingFaction, defendingFaction]));
    }

    if (matchedItems.includes(rewardTypes[1])) {
      embeds.add(embedMaker([defenderReward, defendingFaction, attackingFaction]));
    }

    return [...embeds];
  }
}
