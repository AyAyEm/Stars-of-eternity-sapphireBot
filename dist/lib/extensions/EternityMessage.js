"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityMessage = void 0;
const tslib_1 = require("tslib");
const async_1 = tslib_1.__importDefault(require("async"));
const discord_js_1 = require("discord.js");
class EternityMessage extends discord_js_1.Structures.get('Message') {
    /**
     * Reacts with a list of emojis sequentially.
     * @param emojis A list of emojis.
     * @return A thenable object with stopReactions method.
     */
    multiReact(emojis) {
        let toStop = false;
        const reactions = async_1.default.mapSeries(emojis, async (emoji) => {
            if (toStop)
                return null;
            const reaction = await this.react(emoji);
            // await for the reaction query to finish
            await reaction.fetch();
            return reaction;
        });
        const then = async (callback) => (callback(await reactions));
        const stopReactions = () => {
            toStop = true;
            return { then };
        };
        return { then, stopReactions };
    }
}
exports.EternityMessage = EternityMessage;
//# sourceMappingURL=EternityMessage.js.map