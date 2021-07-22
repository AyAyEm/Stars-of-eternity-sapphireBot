import { MessageEmbed } from 'discord.js';
import type { EmbedFieldData } from 'discord.js';
export declare class EternityMessageEmbed extends MessageEmbed {
    static blankField: {
        name: string;
        value: string;
    };
    addBlankField(inline?: boolean): this;
    addFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): this;
}
