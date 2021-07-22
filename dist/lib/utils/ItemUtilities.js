"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemUtilities = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
var ItemUtilities;
(function (ItemUtilities) {
    const blueprintsSource = new Map([
        ['Recipes', { location: 'Mercado', id: 0 }],
        ['ClanTech', { location: 'Dojo', id: 1 }],
        ['Ostron', { location: 'Cetus', id: 2 }],
        ['VoidTrader', { location: 'Baro', id: 3 }],
        ['Syndicates', { location: 'Sindicato', id: 4 }],
        ['SolarisUnited', { location: 'Fortuna', id: 5 }],
        ['Drop', { location: 'Drop', id: 6 }],
    ]);
    function blueprintSource(item) {
        const { components } = item;
        const { uniqueName, drops } = components
            ? components.filter((componentItem) => componentItem.name === 'Blueprint')[0]
            : item;
        const uniqueNameArr = uniqueName.split('/').slice(3);
        const lab = uniqueNameArr[1];
        const sourceIdentifier = drops ? 'Drop' : uniqueNameArr[0];
        return { ...blueprintsSource.get(sourceIdentifier), lab: (sourceIdentifier === 'ClanTech' ? lab : null) };
    }
    ItemUtilities.blueprintSource = blueprintSource;
    function dropToNameAndChance(enemy) {
        const { location } = enemy;
        const chance = enemy.chance || 0;
        const [name, dropChance] = location.split(' nce: ', 2);
        const actualChance = dropChance ? Number(dropChance) * chance : chance * 100;
        return { name, chance: actualChance };
    }
    ItemUtilities.dropToNameAndChance = dropToNameAndChance;
    function filterForPrimeComponents(components) {
        return components
            .filter(({ drops = [] }) => drops[0]?.location?.toLowerCase().includes('relic'));
    }
    ItemUtilities.filterForPrimeComponents = filterForPrimeComponents;
    ItemUtilities.isPrime = (item) => item.name.includes('Prime');
    function bestDrops(drops = []) {
        return drops.sort(({ chance: A }, { chance: B }) => (B || 0) - (A || 0));
    }
    ItemUtilities.bestDrops = bestDrops;
    function dropsString(drops = []) {
        return lodash_1.default.uniqBy(drops, (drop) => drop.location.split(' ').slice(0, 2).join(' '))
            .reduce((bestDropsString, drop) => {
            const { location } = drop;
            const chance = drop.chance || 0;
            const relicName = location.split(' ').slice(0, 2).join(' ');
            const recomendedTier = location.split(' ')[2];
            return `${bestDropsString}${recomendedTier} **${relicName}** ${Math.round(chance * 100)}%\n`;
        }, '');
    }
    ItemUtilities.dropsString = dropsString;
    function partitionComponents(components, includeBlueprint = false) {
        const toPartitionComponents = includeBlueprint
            ? components
            : components.filter(({ name }) => name !== 'Blueprint');
        return lodash_1.default.partition(toPartitionComponents, ({ uniqueName }) => uniqueName.includes('Items'));
    }
    ItemUtilities.partitionComponents = partitionComponents;
})(ItemUtilities = exports.ItemUtilities || (exports.ItemUtilities = {}));
//# sourceMappingURL=ItemUtilities.js.map