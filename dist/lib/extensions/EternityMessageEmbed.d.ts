import { MessageEmbed } from 'discord.js';
export declare class EternityMessageEmbed extends MessageEmbed {
    static blankField: {
        name: string;
        value: string;
    };
    addBlankField(inline?: boolean): this;
}
