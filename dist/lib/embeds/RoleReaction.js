"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstEmbed = exports.mapToEmbed = void 0;
const discord_js_1 = require("discord.js");
const unicodeEmojiRegex = /u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/;
async function mapToEmbed(guild, rolesEmoji, title) {
    const embed = new discord_js_1.MessageEmbed();
    const fields = [
        { name: 'Emoji', value: '', inline: true },
        { name: 'Cargo', value: '', inline: true },
        { name: 'Descrição', value: '', inline: true },
    ];
    // const roleMap = new Map([...reactionRoleMap.entries()].reverse());
    const roleMap = rolesEmoji;
    await roleMap.forEach(async ({ roleID, description }, emojiId) => {
        const role = await guild.roles.fetch(roleID);
        const emoji = unicodeEmojiRegex.test(emojiId) ? emojiId : guild.emojis.resolve(emojiId);
        const emojiIcon = typeof emoji === 'object' ? `<:${emoji?.name}:${emoji?.id}>` : emoji;
        const [emojiField, roleField, descriptionField] = fields;
        const embedDescription = description || 'Clique na reação para se ganhar este cargo';
        roleField.value += `${role?.name}\n`;
        emojiField.value += `${emojiIcon}\n`;
        descriptionField.value += `${embedDescription}\n`;
    });
    if (title)
        embed.setTitle(title);
    embed.addFields(...fields);
    return embed;
}
exports.mapToEmbed = mapToEmbed;
exports.firstEmbed = new discord_js_1.MessageEmbed()
    .setTitle('Adicione seus cargos com o comando /roleReaction add');
