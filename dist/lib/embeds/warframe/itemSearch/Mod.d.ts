import { EternityMessageEmbed } from "../../..";
import { BaseItemPagedEmbed } from './BaseItem';
export declare class ModPagedEmbed extends BaseItemPagedEmbed {
    rarityColorMap: Map<string, string>;
    baseEmbed(): EternityMessageEmbed;
    mainInfo(): EternityMessageEmbed;
    dropsPage(): EternityMessageEmbed;
}
