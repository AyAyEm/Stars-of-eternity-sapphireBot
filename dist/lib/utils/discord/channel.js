"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyMembers = exports.sendAndDelete = void 0;
async function sendAndDelete(channel, options) {
    const content = typeof options === 'string' ? options : options.content;
    const timeout = typeof options === 'string' || !options.timeout ? 10000 : options.timeout;
    const message = await channel.send(content);
    return new Promise((resolve) => {
        setTimeout(() => resolve(message.delete()), timeout);
    });
}
exports.sendAndDelete = sendAndDelete;
function onlyMembers(channel) {
    return channel.members.filter((guildMember) => !guildMember.user.bot);
}
exports.onlyMembers = onlyMembers;
//# sourceMappingURL=channel.js.map