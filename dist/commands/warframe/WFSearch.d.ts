import FuzzySet from 'fuzzyset.js';
import { Message } from 'discord.js';
import type { Args } from '@sapphire/framework';
import type { Category } from 'warframe-items';
import { MultiEntryMap } from "../../lib/utils";
import { EternityCommand } from "../../lib";
import type { BaseItemPagedEmbed } from "../../lib/embeds/warframe/itemSearch/BaseItem";
declare type ItemCategory = Category | 'Arch-Gun' | 'Arch-Melee';
export default class extends EternityCommand {
    fuzzySet: FuzzySet;
    categoryDictionary: MultiEntryMap<ItemCategory, typeof BaseItemPagedEmbed>;
    onLoad(): Promise<void>;
    messageRun(msg: Message, args: Args): Promise<void>;
}
export {};
