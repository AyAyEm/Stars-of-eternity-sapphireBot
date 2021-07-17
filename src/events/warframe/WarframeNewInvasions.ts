import { MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository } from 'typeorm';

import type { TextChannel } from 'discord.js';
import type { EventOptions } from '@sapphire/framework';

import { EternityEvent } from '#lib';
import { CaseInsensitiveSet } from '#lib/structures';
import { GuildInvasionRepository } from '#repositories';
import { Warframe } from '#utils/Constants';

import type { InvasionData, Reward } from '#lib/types/Warframe';

@ApplyOptions<EventOptions>({ event: 'warframeNewInvasions' })
export default class extends EternityEvent<'warframeNewInvasions'> {
  public async run(invasions: InvasionData[]) {
    const guildInvasionRepo = getCustomRepository(GuildInvasionRepository);

    const guildInvasions = await guildInvasionRepo.createQueryBuilder('guildInvasion')
      .where('guildInvasion.enabled = :enabled', { enabled: true })
      .stream();

    const handler = (data: { guildInvasion_id: number }) => (async () => {
      const guildInvasion = await guildInvasionRepo
        .createQueryBuilder('guildInvasion')
        .leftJoinAndSelect('guildInvasion.items', 'items')
        .leftJoinAndSelect('guildInvasion.channel', 'channel')
        .where('guildInvasion.id = :guildInvasionId', { guildInvasionId: data.guildInvasion_id })
        .getOne();

      if (guildInvasion.items.length > 0) {
        const itemNames = new CaseInsensitiveSet(guildInvasion.items.map(({ name }) => name));

        const channelId = guildInvasion.channel.snowflakeId;
        await Promise.all(invasions
          .filter(({ rewardTypes }) => rewardTypes.find((itemName) => itemNames.has(itemName)))
          .map(async (invasion) => {
            const items = invasion.rewardTypes.filter((itemName) => itemNames.has(itemName));

            const embeds = this.makeEmbeds(invasion, items);
            const discordChannel = await this.client.channels.fetch(channelId) as TextChannel;
            await Promise.all(embeds.map((embed) => discordChannel.send(embed)));
          }));
      }
    })().catch((e) => this.client.console.error(e));

    guildInvasions.on('data', handler);
  }

  private makeEmbeds(invasion: InvasionData, matchedItems: string[]): MessageEmbed[] {
    function embedMaker([reward, defendingFaction, attackingFaction]: [Reward, string, string]) {
      const { factionsStyle } = Warframe;

      return new MessageEmbed()
        .setTitle(`${reward.itemString}`)
        .setThumbnail(reward.thumbnail)
        .setTimestamp()
        .setColor(factionsStyle.get(defendingFaction)?.color || 'white')
        .setAuthor(`${invasion.node} ${invasion.desc}`, factionsStyle.get(defendingFaction)?.tumb)
        .setFooter(`${defendingFaction} x ${attackingFaction}`, factionsStyle.get(attackingFaction)?.tumb);
    }

    const embeds = new Set<MessageEmbed>();
    const numbOfItems = matchedItems.length;
    const {
      attackingFaction, defendingFaction, attackerReward, defenderReward, rewardTypes,
    } = invasion;

    if (attackingFaction === 'Infested') {
      embeds.add(embedMaker([defenderReward, attackingFaction, defendingFaction]));
      if (numbOfItems === 1) return [...embeds];
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
