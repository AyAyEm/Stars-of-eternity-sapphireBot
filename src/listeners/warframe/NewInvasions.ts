import { MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { getCustomRepository } from 'typeorm';

import type { TextChannel } from 'discord.js';

import { CaseInsensitiveSet } from '#lib/structures';
import { WarframeInvasionTrackerRepo } from '#repositories';
import { Warframe } from '#utils';

import type { InvasionData, Reward } from '#lib/types/Warframe';

@ApplyOptions<ListenerOptions>({ event: 'warframeNewInvasions' })
export default class extends Listener {
  public async run(invasions: InvasionData[]) {
    const InvasionTrackerRepo = getCustomRepository(WarframeInvasionTrackerRepo);

    const invasionTrackers = await InvasionTrackerRepo.createQueryBuilder('invasionTracker')
      .where('invasionTracker.enabled = :enabled', { enabled: true })
      .stream();

    const handler = (data: { invasionTracker_id: number }) => (async () => {
      const invasionTracker = await InvasionTrackerRepo
        .createQueryBuilder('invasionTracker')
        .leftJoinAndSelect('invasionTracker.items', 'items')
        .leftJoinAndSelect('invasionTracker.channel', 'channel')
        .where('invasionTracker.id = :invasionTrackerId', { invasionTrackerId: data.invasionTracker_id })
        .getOne();

      if (invasionTracker.items.length > 0) {
        const itemNames = new CaseInsensitiveSet(invasionTracker.items.map(({ name }) => name));

        const channelId = invasionTracker.channel.id;
        await Promise.all(invasions
          .filter(({ rewardTypes }) => rewardTypes.find((itemName) => itemNames.has(itemName)))
          .map(async (invasion) => {
            const items = invasion.rewardTypes.filter((itemName) => itemNames.has(itemName));

            const embeds = this.makeEmbeds(invasion, items);
            const discordChannel = await this.container.client.channels.fetch(channelId) as TextChannel;
            await discordChannel.send({ embeds: embeds });
          }));
      }
    })().catch((e) => this.container.client.logger.error(e));

    invasionTrackers.on('data', handler);
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
