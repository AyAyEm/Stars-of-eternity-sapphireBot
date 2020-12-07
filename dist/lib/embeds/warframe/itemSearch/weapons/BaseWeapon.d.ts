import { MessageEmbed } from 'discord.js';
import type { Item } from 'warframe-items';
export default class BaseWeapon {
    weapon: Item;
    constructor(weapon: Item);
    get baseEmbed(): MessageEmbed;
    get baseStatusEmbed(): MessageEmbed;
}
