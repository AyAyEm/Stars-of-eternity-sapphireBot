import _ from 'lodash';

import { EternityMessageEmbed } from '#lib/extensions';
import { InitPagedEmbed, Page } from '#decorators';
import { ItemUtilities, masteryRankImgs } from '#utils';
import { BaseItemPagedEmbed } from './BaseItem';

@InitPagedEmbed()
export class WarframePagedEmbed extends BaseItemPagedEmbed {
  public bpSource = ItemUtilities.blueprintSource(this.item);

  public async baseEmbed() {
    const { name, imageName, masteryReq, category } = this.item;

    return new EternityMessageEmbed()
      .setTitle(`${name}`)
      .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
      .addField(await this.t('fields:category'), category, false)
      .setFooter(`${await this.t('footer:mastery')} ${masteryReq}`, masteryRankImgs[masteryReq || 0]);
  }

  @Page({ emoji: '📋' })
  public async mainInfo() {
    const { components = [] } = this.item;
    const embed = await this.baseEmbed();

    embed.addField(
      await this.t('fields:status'),
      await this.t('warframe:fields:status', this.item),
      false,
    );

    const prime = ItemUtilities.isPrime(this.item);

    const [resources, componentItems] = ItemUtilities.partitionComponents(components, prime);

    const { bpSource } = this;
    if ('location' in bpSource && 'id' in bpSource && !prime) {
      const blueprintString = bpSource.id === 1
        ? `${bpSource.location} Lab: ${bpSource.lab}`
        : `${bpSource.location}`;

      embed.addField(await this.t('fields:blueprint'), blueprintString, false);
    }

    if (componentItems.length > 0) {
      const componentsString = componentItems
        .map(({ name, itemCount }) => `${name} **${itemCount}**`)
        .join('\n');

      embed.addField(await this.t('fields:components'), componentsString, false);
    }

    if (resources.length > 0) {
      const resourcesNames = resources.map(({ name: resourceName, itemCount }) => (
        `${resourceName} **${itemCount}**`));

      embed.addField(await this.t('fields:resources'), resourcesNames.join('\n'), false);
    }

    return embed;
  }

  @Page({ emoji: '♻' })
  public async componentsPage() {
    if (!this.item.components || this.item.components.length === 0) {
      return null;
    }

    const { components, category } = this.item;
    const embed = await this.baseEmbed();

    if (ItemUtilities.isPrime(this.item)) {
      const componentsFields = ItemUtilities.filterForPrimeComponents(components)
        .sort(({ name }) => (name === 'Blueprint' ? -1 : 1))
        .map(({ name, drops }) => {
          const bestDropsString = ItemUtilities.dropsString(ItemUtilities.bestDrops(drops));

          return { name, value: bestDropsString, inline: false };
        });

      embed.addFields(...componentsFields);
    } else {
      const [resources, componentItems] = ItemUtilities.partitionComponents(components, true);

      if (category === 'Warframes') {
        const componentsFields = componentItems
          .filter(({ drops }) => drops && drops.length > 0)
          .map(({ drops, name }) => {
            const nameAndChance = _.uniqBy(drops, 'location')
              .map((drop) => ItemUtilities.dropToNameAndChance(drop))
              .sort(({ chance: a }, { chance: b }) => {
                if (a === b) return 0;
                return a < b ? 1 : -1;
              })
              .slice(0, 3);

            const dataString = nameAndChance
              .map(({ name: enemyName, chance }) => `${enemyName} **${Math.round(chance * 100) / 100}%**`)
              .join('\n');

            return { name, value: dataString, inline: false };
          });

        embed.addFields(componentsFields);
      } else if (category === 'Archwing') {
        const componentsFields = componentItems
          .map(({ name }) => ({ name, value: 'Tenno lab', inline: false }));

        embed.addFields(componentsFields);
      }

      if (resources.length > 0) {
        const resourcesString = resources
          .map(({ name, itemCount }) => `${name} **${itemCount}**`)
          .join('\n');

        embed.addField(await this.t('fields:resources'), resourcesString, false);
      }
    }

    return embed;
  }
}
