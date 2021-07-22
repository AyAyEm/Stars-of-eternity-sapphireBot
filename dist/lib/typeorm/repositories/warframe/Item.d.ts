import type { Item as WarframeItem } from 'warframe-items';
import { BaseRepository } from "../../../structures";
import { Item } from "../../models";
export declare class ItemRepository extends BaseRepository<Item> {
    findOrInsert(warframeItem: WarframeItem, onlyId?: boolean): Promise<Item>;
    find(warframeItem: WarframeItem, onlyId?: boolean): Promise<Item>;
    findQuery(warframeItem: WarframeItem): import("typeorm").SelectQueryBuilder<Item>;
}
