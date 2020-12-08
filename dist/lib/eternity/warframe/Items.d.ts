import type { Item } from 'warframe-items';
import type { Awaited } from '@sapphire/framework';
export declare class Items {
    readonly dir: string;
    readonly source = "https://raw.githubusercontent.com/WFCD/warframe-items/development/data/json/All.json";
    private _uniqueNameDict;
    latestUpdate?: Date;
    getUniqueNameDict(): Awaited<Record<string, string>>;
    create(): Promise<unknown>;
    get(name: string): Promise<Item | null>;
}
