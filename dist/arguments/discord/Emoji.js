"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emoji = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
class Emoji extends framework_1.Argument {
    constructor(context) {
        super(context, { name: 'emoji' });
    }
    unicodeEmojiRegex = /u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/;
    async run(argument, context) {
        const unicodeEmoji = argument.match(this.unicodeEmojiRegex)?.[0];
        if (unicodeEmoji) {
            return this.ok(new discord_js_1.Emoji(this.context.client, {
                name: unicodeEmoji,
                identifier: unicodeEmoji,
                id: null,
                animated: false,
            }));
        }
        const id = argument.match(/\d+/)?.[0];
        const guildEmoji = context.message.guild.emojis.resolve(id) || null;
        if (guildEmoji)
            return this.ok(guildEmoji);
        return this.error({
            parameter: argument,
            identifier: 'ArgumentInvalidEmoji',
            message: 'Argument passed cannot resolve to a valid emoji',
        });
    }
}
exports.Emoji = Emoji;
//# sourceMappingURL=Emoji.js.map