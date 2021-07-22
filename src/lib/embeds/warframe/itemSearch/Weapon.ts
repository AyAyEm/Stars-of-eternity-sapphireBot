import _ from 'lodash';

import type { Item, Component } from 'warframe-items';
import type { EmbedField } from 'discord.js';

import { masteryRankImgs, rivenDisposition, ItemUtilities } from '#utils';
import { EternityMessageEmbed } from '#lib/extensions';
import { InitPagedEmbed, Page } from '#decorators';

import { specialItems } from './SpecialItems';
import { BaseItemPagedEmbed } from './BaseItem';

@InitPagedEmbed()
export class WeaponPagedEmbed extends BaseItemPagedEmbed {
  public bpSource = ItemUtilities.blueprintSource(this.item);

  public baseEmbed() {
    const {
      name,
      type,
      imageName,
      category,
      masteryReq,
      disposition = 1,
    } = this.item;

    const fields: EmbedField[] = [{ name: this.t('fields:category'), value: category, inline: true }];
    if (type) fields.push({ name: this.t('fields:type'), value: type, inline: true });

    return new EternityMessageEmbed()
      .setTitle(`${name} ${rivenDisposition[disposition - 1]}`)
      .addFields(fields)
      .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
      .setFooter(`${this.t('footer:mastery')} ${masteryReq}`, masteryRankImgs[masteryReq || 0]);
  }

  @Page({ emoji: '📋' })
  public mainInfo() {
    const embed = this.baseEmbed();
    const specialAdjustment = specialItems.get(this.item.name);

    if (specialAdjustment) return specialAdjustment(embed);

    const { components = [] } = this.item;

    const [resources, componentItems] = ItemUtilities.partitionComponents(components);

    if (ItemUtilities.isPrime(this.item)) {
      const primeComponentsString = ItemUtilities.filterForPrimeComponents(components)
        .sort(({ name }) => (name === 'Blueprint' ? -1 : 0))
        .reduce((strings, component) => `${strings}${component.name} **${component.itemCount}**\n`, '');

      embed.addField(this.t('fields:components'), primeComponentsString, false);

      const resourcesString = components
        .filter(({ uniqueName }) => uniqueName.split('/')[3] === 'Items')
        .reduce((string, resource) => `${string}${resource.name} **${resource.itemCount}**\n`, '');

      if (resourcesString) {
        embed.addField(this.t('fields:resources'), resourcesString, false);
      }
    } else {
      if ('id' in this.bpSource && 'location' in this.bpSource) {
        const blueprintString = this.bpSource.id === 1
          ? `${this.bpSource.location} Lab: ${this.bpSource.lab}`
          : `${this.bpSource.location}`;

        embed.addField(this.t('fields:blueprint'), blueprintString, false);
      }

      if (componentItems.length > 0) {
        const componentsString = componentItems
          .map(({ name, itemCount }: Component) => `${name} **${itemCount}**`)
          .join('\n');

        embed.addField(this.t('fields:components'), componentsString, false);
      }

      if (resources.length > 0) {
        const resourcesNames = resources.map(({ name, itemCount }) => `${name} **${itemCount}**`);

        embed.addField(this.t('fields:resources'), resourcesNames.join('\n'), false);
      }
    }

    return embed;
  }

  @Page({ emoji: '♻' })
  public components() {
    const embed = this.baseEmbed();
    const { components } = this.item;

    if (!('location' in this.bpSource) || this.bpSource.location !== 'Drop' || !components) {
      return null;
    }

    if (ItemUtilities.isPrime(this.item)) {
      const componentsFields = components
        .filter(({ drops = [] }) => drops[0]?.location?.toLowerCase().includes('relic'))
        .sort(({ name }) => (name === 'Blueprint' ? -1 : 1))
        .map(({ name, drops }) => {
          const bestDropsString = ItemUtilities.dropsString(ItemUtilities.bestDrops(drops));
          return { name, value: bestDropsString, inline: false };
        });

      embed.addFields(...componentsFields);
    } else {
      const [resources, componentItems] = ItemUtilities.partitionComponents(components);

      const componentsFields = componentItems.map(({ drops, name }: Component) => {
        const nameAndChance = _.uniqBy(drops, 'location')
          .map((drop) => ItemUtilities.dropToNameAndChance(drop))
          .sort(({ chance: A }, { chance: B }) => B - A)
          .slice(0, 3);

        const dataString = nameAndChance
          .map(({ name: enemyName, chance }) => `${enemyName} **${Math.round(chance * 100) / 100}%**`)
          .join('\n');

        return { name, value: dataString, inline: false };
      });

      embed.addFields(componentsFields);

      if (resources.length > 0) {
        const resourcesString = resources
          .map(({ name, itemCount }: Component) => `${name} **${itemCount}**`)
          .join('\n');

        embed.addField(this.t('fields:resources'), resourcesString, false);
      }
    }

    return embed;
  }

  @Page({ emoji: '🃏' })
  public status() {
    const embed = this.baseEmbed();

    const {
      criticalChance, criticalMultiplier, procChance, fireRate, accuracy,
      trigger, magazineSize, reloadTime, ammo, damageTypes = {}, totalDamage,
      projectile, category,
      // flight,secondary,areaAttack, damage, multishot, noise,
    }: Item = this.item;

    const embedStrings: { [key: string]: string } = {
      critical: this.t(
        'weapon:fields:critical',
        { chance: _.round(criticalChance * 100, 2), multiplier: criticalMultiplier },
      ),
      status: this.t('weapon:fields:status', { chance: _.round(procChance * 100, 2) }),
      damage: `${Object.entries(damageTypes).map(([type, dmg]) => `${type}: ${dmg}`).join('\n')}`,
      ammo: this.t('weapon:fields:ammo', { ammo, magazineSize }),
      utility: [
        this.t(
          // eslint-disable-next-line no-constant-condition
          `weapon:fields:utility:${category === 'Melee' || 'Arch-Melee' ? 'attackSpeed' : 'fireRate'}`,
          { fireRate: _.round(fireRate, 2) },
        ),
        `${trigger ? this.t('weapon:fields:utility:trigger', { trigger }) : ''}`,
        `${projectile ? this.t('weapon:fields:utility:projectile', { projectile }) : ''}`,
        `${reloadTime ? this.t('weapon:fields:utility:reloadTime', { reloadTime }) : ''}`,
        `${accuracy ? this.t('weapon:fields:utility:accuracy', { accuracy: _.round(accuracy, 2) }) : ''}`,
      ].filter((str) => str).join('\n'),
    };

    const fields = [
      { name: this.t('fields:damage', { totalDamage }), value: embedStrings.damage, inline: false },
      { name: this.t('fields:critical'), value: embedStrings.critical, inline: false },
      { name: this.t('fields:status'), value: embedStrings.status, inline: false },
      { name: this.t('fields:utility'), value: embedStrings.utility, inline: false },
    ];

    if (ammo) fields.push({ name: this.t('fields:ammo'), value: embedStrings.ammo, inline: true });
    embed.addFields(fields);

    return embed;
  }
}
