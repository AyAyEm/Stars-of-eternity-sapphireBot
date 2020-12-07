"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityGuild = void 0;
const discord_js_1 = require("discord.js");
class EternityGuild extends discord_js_1.Structures.get('Guild') {
    get voiceChannels() {
        return this.channels.cache.filter(({ type }) => type === 'voice');
    }
    get channelWithMostMembers() {
        const voiceChannels = this.channels.cache
            .filter((channel) => channel.type === 'voice');
        return voiceChannels
            .map((channel) => {
            const userCount = channel.members
                .filter((member) => !member.user.bot)
                .keyArray().length;
            return { userCount, channel };
        })
            .sort(({ userCount: A }, { userCount: B }) => B - A)[0].channel;
    }
}
exports.EternityGuild = EternityGuild;
