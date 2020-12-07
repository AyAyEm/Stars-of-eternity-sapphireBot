import type { Item } from 'warframe-items';
declare type Drops = Item['drops'];
export declare function bestDrops(drops?: Drops): import("warframe-items").Drop[];
export declare function dropsString(drops?: Drops): string;
export {};
