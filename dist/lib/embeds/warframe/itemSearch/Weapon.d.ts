import { EternityMessageEmbed } from "../../../extensions";
import { BaseItemPagedEmbed } from './BaseItem';
export declare class WeaponPagedEmbed extends BaseItemPagedEmbed {
    bpSource: {
        lab: string;
        location: string;
        id: number;
    };
    baseEmbed(): EternityMessageEmbed;
    mainInfo(): EternityMessageEmbed;
    components(): EternityMessageEmbed;
    status(): EternityMessageEmbed;
}
