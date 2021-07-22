import FuzzySet from 'fuzzyset.js';
import type { Args } from '@sapphire/framework';
import type { Category } from 'warframe-items';
import { MultiEntryMap } from "../../lib/utils";
import { EternityCommand, EternityMessage } from "../../lib";
import type { BaseItemPagedEmbed } from "../../lib/embeds/warframe/itemSearch/BaseItem";
declare type ItemCategory = Category | 'Arch-Gun' | 'Arch-Melee';
export default class extends EternityCommand {
    items: import("../../lib/eternity").Items;
    fuzzySet: FuzzySet;
    categoryDictionary: MultiEntryMap<ItemCategory, typeof BaseItemPagedEmbed>;
    onLoad(): Promise<void>;
    run(msg: EternityMessage, args: Args): Promise<void>;
}
export {};
