import { MessageEmbed } from 'discord.js';
import type { Item } from 'warframe-items';
export declare class BaseWarframe {
    warframe: Item;
    constructor(warframe: Item);
    get baseEmbed(): MessageEmbed;
    private get bpSource();
    get mainInfoPage(): MessageEmbed;
    buildPages(): any;
}
export default BaseWarframe;
