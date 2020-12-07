import { EternityCommand, EternityMessage } from '@lib';
import { Args } from '@sapphire/framework';
import FuzzySet from 'fuzzyset.js';
import type { Item } from 'warframe-items';
export default class extends EternityCommand {
    items: import("../../lib/eternity").Items;
    itemNames: Promise<string[]>;
    fuzzySet: Promise<FuzzySet>;
    run(msg: EternityMessage, args: Args): Promise<void>;
    sendItemMessage(item: Item, msg: EternityMessage, previousSentMessage?: EternityMessage): Promise<void>;
}
