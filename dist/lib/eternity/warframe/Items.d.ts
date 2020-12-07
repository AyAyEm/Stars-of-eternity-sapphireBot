import type { Item } from 'warframe-items';
import type { Awaited } from '@sapphire/framework';
export declare class Items {
    readonly dir: string;
    readonly source = "https://raw.githubusercontent.com/WFCD/warframe-items/development/data/json/All.json";
    private _uniqueNameDict;
    latestUpdate?: Date;
    get uniqueNameDict(): Awaited<Record<string, string>>;
    create(): Promise<void>;
    get(name: string, createIfNotExists?: boolean): Promise<Item | null>;
}
