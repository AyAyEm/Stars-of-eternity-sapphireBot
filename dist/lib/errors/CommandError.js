"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandError = void 0;
const framework_1 = require("@sapphire/framework");
class CommandError extends framework_1.UserError {
    command;
    payload;
    get name() { return 'CommandError'; }
}
exports.CommandError = CommandError;
//# sourceMappingURL=CommandError.js.map