import { masteryRankImgs, biFilter } from '@utils';
import { EternityMessageEmbed } from '@lib';

import type { Item } from 'warframe-items';
import { blueprintSource } from '../utils';

type Component = Extract<Item['components'], Object>[0];

export abstract class BaseWarframe {
  public bpSource: ReturnType<typeof blueprintSource>;

  constructor(public warframe: Item) {
    this.bpSource = blueprintSource(warframe);
  }

  public get baseEmbed(): EternityMessageEmbed {
    const { name, imageName, masteryReq, category } = this.warframe;

    return new EternityMessageEmbed()
      .setTitle(`${name}`)
      .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
      .addField('Categoria', category, false)
      .setFooter(`Maestria ${masteryReq}`, masteryRankImgs[masteryReq || 0]);
  }

  public get mainInfoPage() {
    const { warframe, bpSource } = this;
    const {
      components = [], health, armor, shield, power, sprintSpeed,
    }: Item = warframe;
    const embed = this.baseEmbed;
    embed.addField('Status', `Vida: ${health}\nArmadura: ${armor}\nEscudo: ${shield}\n`
      + `Energia: ${power}\nVelocidade de corrida: ${sprintSpeed}`, false);

    const [
      resources,
      componentItems,
    ] = biFilter<Component>(components.filter(({ name }) => name !== 'Blueprint'),
      ({ uniqueName }: Item) => (
        uniqueName.includes('Items')));

    if ('location' in bpSource && 'id' in bpSource) {
      const blueprintString = bpSource.id === 1
        ? `${bpSource.location} Lab: ${bpSource.lab}`
        : `${bpSource.location}`;
      embed.addField('Blueprint', blueprintString, false);
    }

    if (componentItems.length > 0) {
      const componentsString = componentItems
        .map(({ name, itemCount }) => `${name} **${itemCount}**`)
        .join('\n');
      embed.addField('Componentes', componentsString, false);
    }

    if (resources.length > 0) {
      const resourcesNames = resources.map(({ name: resourceName, itemCount }) => (
        `${resourceName} **${itemCount}**`));
      const resourcesString = resourcesNames.join('\n');
      embed.addField('Recursos', resourcesString, false);
    }
    return embed;
  }
}

export default BaseWarframe;
