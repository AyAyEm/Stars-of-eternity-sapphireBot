"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiReact = void 0;
const tslib_1 = require("tslib");
const async_1 = (0, tslib_1.__importDefault)(require("async"));
function multiReact(msg, emojis) {
    let toStop = false;
    const reactions = async_1.default.mapSeries(emojis, async (emoji) => {
        if (toStop)
            return null;
        const reaction = await msg.react(emoji);
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
exports.multiReact = multiReact;
//# sourceMappingURL=message.js.map