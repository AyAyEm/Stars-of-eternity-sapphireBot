"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleReactionManager = void 0;
async function roleReactionManager(messageReaction, user, action) {
    if (user.bot)
        return;
    const msg = messageReaction.message;
    const document = new this.client.provider.Guilds(msg.guild.id);
    const messageDocument = await document.get(`channels.${msg.channel.id}.messages.${msg.id}`);
    if (!messageDocument || messageDocument.msgType !== 'roleReaction')
        return;
    const { emojiRoleMap } = messageDocument;
    const emoji = messageReaction.emoji.toString();
    if (!emojiRoleMap || emojiRoleMap.size === 0)
        return;
    const role = emojiRoleMap.get(emoji);
    const member = await msg.guild.members.fetch(user.id);
    if (action === 'add' && !(member.roles.cache.has(role)))
        member.roles.add(role);
    else if (action === 'remove' && (member.roles.cache.has(role)))
        member.roles.remove(role);
}
exports.roleReactionManager = roleReactionManager;
