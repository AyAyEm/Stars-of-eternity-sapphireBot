"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelWithMostMembers = exports.voiceChannels = void 0;
function voiceChannels(guild) {
    return guild.channels.cache
        .filter((channel) => channel.type === 'GUILD_VOICE');
}
exports.voiceChannels = voiceChannels;
function channelWithMostMembers(guild) {
    const channels = voiceChannels(guild);
    return channels
        .map((channel) => {
        const userCount = channel.members
            .filter((member) => !member.user.bot)
            .size;
        return { userCount, channel };
    })
        .sort(({ userCount: A }, { userCount: B }) => B - A)[0].channel;
}
exports.channelWithMostMembers = channelWithMostMembers;
//# sourceMappingURL=guild.js.map