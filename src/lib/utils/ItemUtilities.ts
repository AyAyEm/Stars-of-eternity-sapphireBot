import _ from 'lodash';

import type { Item, Component, Drop } from 'warframe-items';

export namespace ItemUtilities {
  const blueprintsSource = new Map([
    ['Recipes', { location: 'Mercado', id: 0 }],
    ['ClanTech', { location: 'Dojo', id: 1 }],
    ['Ostron', { location: 'Cetus', id: 2 }],
    ['VoidTrader', { location: 'Baro', id: 3 }],
    ['Syndicates', { location: 'Sindicato', id: 4 }],
    ['SolarisUnited', { location: 'Fortuna', id: 5 }],
    ['Drop', { location: 'Drop', id: 6 }],
  ]);

  export function blueprintSource(item: Item) {
    const { components } = item;
    const { uniqueName, drops } = components
      ? components.filter((componentItem) => componentItem.name === 'Blueprint')[0]
      : item;
    const uniqueNameArr = uniqueName.split('/').slice(3);
    const lab = uniqueNameArr[1];
    const sourceIdentifier = drops ? 'Drop' : uniqueNameArr[0];
    return { ...blueprintsSource.get(sourceIdentifier), lab: (sourceIdentifier === 'ClanTech' ? lab : null) };
  }

  export function dropToNameAndChance(enemy: Drop) {
    const { location } = enemy;
    const chance = enemy.chance || 0;

    const [name, dropChance] = location.split(' nce: ', 2);
    const actualChance = dropChance ? Number(dropChance) * chance : chance * 100;

    return { name, chance: actualChance };
  }

  export function filterForPrimeComponents(components: Component[]) {
    return components
      .filter(({ drops = [] }: Component) => drops[0]?.location?.toLowerCase().includes('relic'));
  }

  export const isPrime = (item: Item) => item.name.includes('Prime');

  export function bestDrops(drops: Drop[] = []) {
    return drops.sort(({ chance: A }, { chance: B }) => (B || 0) - (A || 0));
  }

  export function dropsString(drops: Drop[] = []) {
    return _.uniqBy(drops, (drop) => drop.location.split(' ').slice(0, 2).join(' '))
      .reduce((bestDropsString, drop) => {
        const { location } = drop;
        const chance: number = drop.chance || 0;

        const relicName = location.split(' ').slice(0, 2).join(' ');
        const recomendedTier = location.split(' ')[2];
        return `${bestDropsString}${recomendedTier} **${relicName}** ${Math.round(chance * 100)}%\n`;
      }, '');
  }

  export function partitionComponents(components: Component[], includeBlueprint = false) {
    const toPartitionComponents = includeBlueprint
      ? components
      : components.filter(({ name }) => name !== 'Blueprint');

    return _.partition(toPartitionComponents, ({ uniqueName }) => uniqueName.includes('Items'));
  }
}
