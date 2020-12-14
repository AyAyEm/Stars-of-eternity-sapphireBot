"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityMessageEmbed = void 0;
const discord_js_1 = require("discord.js");
class EternityMessageEmbed extends discord_js_1.MessageEmbed {
    static blankField = { name: '\u200b', value: '\u200b' };
    addBlankField(inline = false) {
        const { name, value } = EternityMessageEmbed.blankField;
        return this.addField(name, value, inline);
    }
}
exports.EternityMessageEmbed = EternityMessageEmbed;
//# sourceMappingURL=EternityMessageEmbed.js.map