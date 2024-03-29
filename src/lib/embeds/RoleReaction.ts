import { MessageEmbed } from 'discord.js';
import type { Guild } from 'discord.js';

const unicodeEmojiRegex = /u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/;

type RolesEmoji = Map<string, { roleId: string }>;

export async function mapToEmbed(guild: Guild, rolesEmoji: RolesEmoji, title?: string) {
  const embed = new MessageEmbed();
  const fields = [
    { name: 'Emoji', value: '', inline: true },
    { name: 'Cargo', value: '', inline: true },
  ];
  // const roleMap = new Map([...reactionRoleMap.entries()].reverse());
  const roleMap = rolesEmoji;
  await roleMap.forEach(async ({ roleId: roleID }, emojiId) => {
    const role = await guild.roles.fetch(roleID);
    const emoji = unicodeEmojiRegex.test(emojiId) ? emojiId : guild.emojis.resolve(emojiId);
    const emojiIcon = typeof emoji === 'object' ? `<:${emoji?.name}:${emoji?.id}>` : emoji;
    const [emojiField, roleField] = fields;
    roleField.value += `${role?.name}\n`;
    emojiField.value += `${emojiIcon}\n`;
  });
  if (title) embed.setTitle(title);
  embed.addFields(...fields);
  return embed;
}

export const firstEmbed = new MessageEmbed()
  .setTitle('Adicione seus cargos com o comando /roleReaction add');
