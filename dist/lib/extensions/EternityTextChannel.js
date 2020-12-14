"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityTextChannel = void 0;
const discord_js_1 = require("discord.js");
class EternityTextChannel extends discord_js_1.Structures.get('TextChannel') {
    async sendAndDelete(content, options) {
        const { timeout = 10000, reason = '' } = options;
        return (await this.send(content)).delete({ timeout, reason });
    }
}
exports.EternityTextChannel = EternityTextChannel;
//# sourceMappingURL=EternityTextChannel.js.map