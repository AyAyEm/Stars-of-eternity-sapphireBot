import { EternityMessageEmbed } from "../../../..";
import type { Item } from 'warframe-items';
import { blueprintSource } from '../utils';
export declare abstract class BaseWarframe {
    warframe: Item;
    bpSource: ReturnType<typeof blueprintSource>;
    constructor(warframe: Item);
    get baseEmbed(): EternityMessageEmbed;
    get mainInfoPage(): EternityMessageEmbed;
}
export default BaseWarframe;
