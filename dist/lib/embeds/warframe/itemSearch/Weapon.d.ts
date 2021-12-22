import { EternityMessageEmbed } from "../../../extensions";
import { BaseItemPagedEmbed } from './BaseItem';
export declare class WeaponPagedEmbed extends BaseItemPagedEmbed {
    private _specialWeapons?;
    private specialWeapons;
    bpSource: {
        lab: string;
        location: string;
        id: number;
    };
    baseEmbed(): Promise<EternityMessageEmbed>;
    mainInfo(): Promise<EternityMessageEmbed>;
    components(): Promise<EternityMessageEmbed>;
    status(): Promise<EternityMessageEmbed>;
}
