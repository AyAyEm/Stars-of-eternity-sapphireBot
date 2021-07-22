import type { Args } from '@sapphire/framework';
import type { Item as WarframeItem } from 'warframe-items';
import { EternityCommandWSC, EternityMessageEmbed } from "../../lib";
import { CaseInsensitiveMap } from "../../lib/structures/CaseInsensitiveMap";
import { InvasionTrackerRepository, ItemRepository } from "../../lib/typeorm";
import type { EternityMessage } from "../../lib";
export default class extends EternityCommandWSC {
    possibleItemsEmbed: EternityMessageEmbed;
    itemsDict: CaseInsensitiveMap<string, WarframeItem>;
    get invasionTrackerRepo(): InvasionTrackerRepository;
    get itemRepo(): ItemRepository;
    items(msg: EternityMessage, args: Args): Promise<void>;
    disable(msg: EternityMessage): Promise<void>;
    enable(msg: EternityMessage): Promise<void>;
    private setEnabled;
    add(msg: EternityMessage, args: Args): Promise<void>;
    delete(msg: EternityMessage, args: Args): Promise<void>;
    private updateItems;
}
