import type { Item } from 'warframe-items';
export declare class Items {
    readonly dir = "data/warframe-items";
    readonly source = "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/All.json";
    private uniqueNameDict;
    latestUpdate?: Date;
    private _getUniqueNames;
    getUniqueNames(): Promise<Map<string, string | string[]>>;
    create(): Promise<void>;
    get(name: string): Promise<Item | null>;
}
