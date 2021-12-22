import { ColorResolvable } from 'discord.js';
import { EternityMessageEmbed } from "../../..";
import { BaseItemPagedEmbed } from './BaseItem';
export declare class ModPagedEmbed extends BaseItemPagedEmbed {
    rarityColorMap: Map<string, ColorResolvable>;
    baseEmbed(): EternityMessageEmbed;
    mainInfo(): Promise<EternityMessageEmbed>;
    dropsPage(): Promise<EternityMessageEmbed>;
}
