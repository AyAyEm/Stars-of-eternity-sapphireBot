"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityMessage = void 0;
const async_1 = __importDefault(require("async"));
const framework_1 = require("@sapphire/framework");
class EternityMessage extends framework_1.SapphireMessage {
    async replyTranslated(key, valuesOrOptions, rawOptions) {
        const [values, options] = (typeof valuesOrOptions === 'undefined' || Array.isArray(valuesOrOptions))
            ? [valuesOrOptions ?? [], rawOptions ?? {}]
            : [[], valuesOrOptions];
        const content = await this.fetchLanguageKey(key, ...values);
        return this.reply(content, options);
    }
    async replyAndDelete(content, options) {
        const { timeout = 10000, reason = '', delSource = false } = options;
        const reply = await this.reply(content);
        if (delSource)
            this.delete({ timeout, reason });
        return reply.delete({ timeout, reason });
    }
    /**
     * Reacts with a list of emojis sequentially.
     * @param emojis A list of emojis.
     * @return A thenable object with stopReactions method.
     */
    multiReact(emojis) {
        let toStop = false;
        const stopReactions = () => { toStop = true; };
        const reactions = async_1.default.mapSeries(emojis, async (emoji) => {
            if (toStop)
                return null;
            const reaction = await this.react(emoji);
            // await for the reaction query to finish
            await reaction.fetch();
            return reaction;
        });
        const then = async (callback) => (callback(await reactions));
        return { then, stopReactions };
    }
}
exports.EternityMessage = EternityMessage;
