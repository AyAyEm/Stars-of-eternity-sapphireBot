import _ from 'lodash';

import { ColorResolvable } from 'discord.js';

import { Page, InitPagedEmbed } from '#decorators';
import { EternityMessageEmbed } from '#lib';
import { BaseItemPagedEmbed } from './BaseItem';

@InitPagedEmbed()
export class ModPagedEmbed extends BaseItemPagedEmbed {
  public rarityColorMap = new Map<string, ColorResolvable>([
    ['Common', '#876f4e'],
    ['Uncommon', '#fefefe'],
    ['Rare', '#dec67c'],
    ['Legendary', '#fffeff'],
    ['Requiem', 'DARK_RED'],
  ]);

  public baseEmbed() {
    const { name, rarity, polarity, imageName } = this.item;

    return new EternityMessageEmbed()
      .setTitle(`Mod: ${name}`)
      .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
      .setFooter(`${rarity} ${polarity}`)
      .setColor(this.rarityColorMap.get(rarity as string) || 'WHITE');
  }

  @Page({ emoji: '📋' })
  public async mainInfo() {
    const { tradable, levelStats, transmutable } = this.item;

    const embed = this.baseEmbed();

    embed.addFields([
      { name: await this.t('fields:tradable'), value: tradable ? '✅' : '❌', inline: true },
      { name: await this.t('fields:transmutable'), value: transmutable ? '✅' : '❌', inline: true },
      { ...EternityMessageEmbed.blankField, inline: true },
    ]);

    if (levelStats) {
      const percentageRegex = /[+-]?\d+%/;
      const statsFields = await Promise.all(levelStats[levelStats.length - 1].stats.map(async (stat, index) => {
        const minStat = levelStats[0].stats[index].match(percentageRegex)?.[0];
        const maxStat = stat.match(percentageRegex)?.[0];

        return [
          { name: await this.t('fields:stat'), value: stat, inline: true },
          { name: await this.t('fields:minMax'), value: `${minStat}/${maxStat}`, inline: true },
          { ...EternityMessageEmbed.blankField, inline: true },
        ];
      }));

      embed.addFields(statsFields.flat());
    }

    return embed;
  }

  @Page({ emoji: '♻' })
  public async dropsPage() {
    const { drops } = this.item;
    if (!drops) return null;

    const embed = this.baseEmbed();

    await Promise.all(_(drops)
      .groupBy('type')
      .map(async (dropsList, group) => {
        const [
          locationsString,
          percentagesString,
        ] = dropsList.reduce(([locations, percentages], { location, chance = 0 }) => (
          [
            `${locations}${location}\n`,
            `${percentages}${_.round(chance * 100, 2)}%\n`,
          ]
        ), ['', '']);

        embed.addFields([
          { name: await this.t(`mod:groups:${group}`, { group }), value: locationsString, inline: true },
          { name: await this.t('fields:chance'), value: percentagesString, inline: true },
          { ...EternityMessageEmbed.blankField, inline: true },
        ]);
      }).value());

    return embed;
  }
}
