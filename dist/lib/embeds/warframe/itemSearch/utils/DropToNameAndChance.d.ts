import type { Item } from 'warframe-items';
declare type Drop = Extract<Item['drops'], Object>[0];
export declare function dropToNameAndChance(enemy: Drop): {
    name: string;
    chance: number;
};
export {};
