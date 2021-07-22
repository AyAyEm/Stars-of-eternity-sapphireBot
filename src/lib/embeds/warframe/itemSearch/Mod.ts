import _ from 'lodash';

import { Page, InitPagedEmbed } from '#decorators';
import { EternityMessageEmbed } from '#lib';
import { BaseItemPagedEmbed } from './BaseItem';

@InitPagedEmbed()
export class ModPagedEmbed extends BaseItemPagedEmbed {
  public rarityColorMap = new Map([
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
  public mainInfo() {
    const { tradable, levelStats, transmutable } = this.item;

    const embed = this.baseEmbed();

    embed.addFields([
      { name: this.t('fields:tradable'), value: tradable ? '✅' : '❌', inline: true },
      { name: this.t('fields:transmutable'), value: transmutable ? '✅' : '❌', inline: true },
      { ...EternityMessageEmbed.blankField, inline: true },
    ]);

    if (levelStats) {
      const percentageRegex = /[+-]?\d+%/;
      const statsFields = levelStats[levelStats.length - 1].stats.map((stat, index) => {
        const minStat = levelStats[0].stats[index].match(percentageRegex)?.[0];
        const maxStat = stat.match(percentageRegex)?.[0];

        return [
          { name: this.t('fields:stat'), value: stat, inline: true },
          { name: this.t('fields:minMax'), value: `${minStat}/${maxStat}`, inline: true },
          { ...EternityMessageEmbed.blankField, inline: true },
        ];
      });

      embed.addFields(statsFields.flat());
    }

    return embed;
  }

  @Page({ emoji: '♻' })
  public dropsPage() {
    const { drops } = this.item;
    if (!drops) return null;

    const embed = this.baseEmbed();

    _(drops)
      .groupBy('type')
      .forEach((dropsList, group) => {
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
          { name: this.t(`mod:groups:${group}`, group), value: locationsString, inline: true },
          { name: this.t('fields:chance'), value: percentagesString, inline: true },
          { ...EternityMessageEmbed.blankField, inline: true },
        ]);
      });

    return embed;
  }
}
