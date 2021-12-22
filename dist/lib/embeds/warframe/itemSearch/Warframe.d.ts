import { EternityMessageEmbed } from "../../../extensions";
import { BaseItemPagedEmbed } from './BaseItem';
export declare class WarframePagedEmbed extends BaseItemPagedEmbed {
    bpSource: {
        lab: string;
        location: string;
        id: number;
    };
    baseEmbed(): Promise<EternityMessageEmbed>;
    mainInfo(): Promise<EternityMessageEmbed>;
    componentsPage(): Promise<EternityMessageEmbed>;
}
