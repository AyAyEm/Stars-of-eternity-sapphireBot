import i18n from 'i18next';
import async from 'async';
import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository } from 'typeorm';

import type { Args } from '@sapphire/framework';

import { EternityCommandWSC, EternityMessageEmbed } from '#lib';
import { RoleReactionRepository } from '#repositories';

import type {
  EternityCommandWSCOptions,
  EternityMessage,
  EternityGuild,
} from '#lib';

@ApplyOptions<EternityCommandWSCOptions>({
  preconditions: ['GuildOnly', 'OwnerOnly'],
  subCommands: [
    'create',
    'renew',
    { name: 'delete', requiredArgs: ['message'], aliases: ['remove'] },
    { name: 'add', requiredArgs: ['emoji', 'role'] },
  ],
  enabled: false,
})
export default class extends EternityCommandWSC {
  private async mapToEmbed(
    guild: EternityGuild,
    roleEmoji: Map<string, string>,
    title?: string,
  ) {
    const embed = new EternityMessageEmbed();
    const fields = [
      { name: 'Emoji', value: '', inline: true },
      { name: 'Cargo', value: '', inline: true },
    ];

    await async.forEach(roleEmoji.entries(), async ([roleId, emoji]) => {
      const role = await guild.roles.fetch(roleId);
      const [emojiField, roleField] = fields;

      roleField.value += `${role?.name}\n`;
      emojiField.value += `${emoji}\n`;
    });

    if (title) embed.setTitle(title);
    embed.addFields(...fields);
    return embed;
  }

  private get firstEmbed() {
    return new EternityMessageEmbed().setTitle(i18n.t('commands/RoleReaction:firstEmbed'));
  }

  private get roleReactionRepo() {
    return getCustomRepository(RoleReactionRepository);
  }

  public async create(msg: EternityMessage, args: Args) {
  }

  public async delete(msg: EternityMessage, args: Args) {
  }

  public async add(msg: EternityMessage, args: Args) {
  }

  public async renew(msg: EternityMessage, args: Args) {
  }
}
