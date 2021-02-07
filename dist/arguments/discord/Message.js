"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const framework_1 = require("@sapphire/framework");
class Message extends framework_1.Argument {
    constructor(context) {
        super(context, { name: 'message' });
    }
    async run(parameter, context) {
        const message = await context.message.channel.messages.fetch(parameter);
        if (!message) {
            return this.error({
                parameter,
                identifier: 'ArgumentInvalidMessage',
                message: 'Argument passed cannot resolve to a valid message in this channel',
            });
        }
        return this.ok(message);
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map