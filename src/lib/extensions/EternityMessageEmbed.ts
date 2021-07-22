import { MessageEmbed } from 'discord.js';

import type { EmbedFieldData } from 'discord.js';

export class EternityMessageEmbed extends MessageEmbed {
  public static blankField = { name: '\u200b', value: '\u200b' };

  public addBlankField(inline = false) {
    const { name, value } = EternityMessageEmbed.blankField;
    return this.addField(name, value, inline);
  }

  public addFields(...fields: EmbedFieldData[] | EmbedFieldData[][]) {
    const normalizeField = ({ name, value, inline }: EmbedFieldData): EmbedFieldData => (
      { name: name || '\u200b', value: value || '\u200b', inline });

    return super.addFields(...fields.map((fieldOrFields: EmbedFieldData | EmbedFieldData[]) => {
      if (fieldOrFields instanceof Array) {
        return fieldOrFields.map(normalizeField);
      }

      return normalizeField(fieldOrFields);
    }) as EmbedFieldData[] | EmbedFieldData[][]);
  }
}
