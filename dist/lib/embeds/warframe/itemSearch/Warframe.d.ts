import { EternityMessageEmbed } from "../../../extensions";
import { BaseItemPagedEmbed } from './BaseItem';
export declare class WarframePagedEmbed extends BaseItemPagedEmbed {
    bpSource: {
        lab: string;
        location: string;
        id: number;
    };
    baseEmbed(): EternityMessageEmbed;
    mainInfo(): EternityMessageEmbed;
    componentsPage(): EternityMessageEmbed;
}
