import { EternityMessageEmbed } from '@lib';
import type { Item } from 'warframe-items';
export default class BaseWeapon {
    weapon: Item;
    constructor(weapon: Item);
    get baseEmbed(): EternityMessageEmbed;
    get baseStatusEmbed(): EternityMessageEmbed;
}
