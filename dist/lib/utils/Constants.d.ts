import { HexColorString } from 'discord.js';
export declare namespace Warframe {
    interface MetaFaction {
        tumb: string;
        color: HexColorString;
    }
    export const factionsStyle: Map<string, MetaFaction>;
    export {};
}
declare const itemNames: {
    [key: string]: string[];
};
export { itemNames };
export declare const masteryRankImgs: string[];
export declare const rivenDisposition: string[];
export declare const numberEmojis: string[];
export declare const enum EternityFormatters {
    AndList = "andList",
    OrList = "orList",
    Permissions = "permissions"
}
export declare const enum Time {
    Millisecond = 1,
    Second = 1000,
    Minute = 60000,
    Hour = 3600000,
    Day = 86400000,
    Year = 31536000000
}
