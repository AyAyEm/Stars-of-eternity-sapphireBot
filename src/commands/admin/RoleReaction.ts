/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import async from 'async';
import { ApplyOptions } from '@sapphire/decorators';
import { resolveKey } from '@sapphire/plugin-i18next';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { getCustomRepository } from 'typeorm';

import type { Args } from '@sapphire/framework';
import type { Guild, Message } from 'discord.js';

import { EternityMessageEmbed } from '#lib';
import { RoleReactionRepo } from '#repositories';

@ApplyOptions<SubCommandPluginCommand.Options>({
  preconditions: ['GuildOnly', 'OwnerOnly'],
  subCommands: [
    'create',
    'renew',
    'delete',
    'add',
  ],
  enabled: false,
})
export default class extends SubCommandPluginCommand {
  private async mapToEmbed(
    guild: Guild,
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

  // private async firstEmbed() {
  //   return new EternityMessageEmbed().setTitle(await resolveKey(this.container.client, 'commands/RoleReaction:firstEmbed'));
  // }

  private get roleReactionRepo() {
    return getCustomRepository(RoleReactionRepo);
  }

  public async create(msg: Message, args: Args) {
  }

  public async delete(msg: Message, args: Args) {
  }

  public async add(msg: Message, args: Args) {
  }

  public async renew(msg: Message, args: Args) {
  }
}
