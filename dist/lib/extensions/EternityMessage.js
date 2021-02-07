"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityMessage = void 0;
const async_1 = __importDefault(require("async"));
const discord_js_1 = require("discord.js");
class EternityMessage extends discord_js_1.Structures.get('Message') {
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
//# sourceMappingURL=EternityMessage.js.map