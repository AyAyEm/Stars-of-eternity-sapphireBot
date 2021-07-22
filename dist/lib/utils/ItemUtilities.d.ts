import type { Item, Component, Drop } from 'warframe-items';
export declare namespace ItemUtilities {
    function blueprintSource(item: Item): {
        lab: string;
        location: string;
        id: number;
    };
    function dropToNameAndChance(enemy: Drop): {
        name: string;
        chance: number;
    };
    function filterForPrimeComponents(components: Component[]): Component[];
    const isPrime: (item: Item) => boolean;
    function bestDrops(drops?: Drop[]): Drop[];
    function dropsString(drops?: Drop[]): string;
    function partitionComponents(components: Component[], includeBlueprint?: boolean): [Component[], Component[]];
}
