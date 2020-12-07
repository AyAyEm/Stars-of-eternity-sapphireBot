"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityVoiceChannel = void 0;
const discord_js_1 = require("discord.js");
class EternityVoiceChannel extends discord_js_1.Structures.get('VoiceChannel') {
    get onlyMembers() {
        return this.members.filter((guildMember) => !guildMember.user.bot);
    }
}
exports.EternityVoiceChannel = EternityVoiceChannel;
