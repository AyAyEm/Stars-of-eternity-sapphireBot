"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandError = void 0;
const framework_1 = require("@sapphire/framework");
class CommandError extends framework_1.UserError {
    name = 'CommandError';
    command;
    payload;
}
exports.CommandError = CommandError;
