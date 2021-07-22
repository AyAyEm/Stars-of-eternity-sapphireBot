"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMsgs = void 0;
async function deleteMsgs(messages, options) {
    return Promise.all((await Promise.all(messages)).map((message) => message.delete(options)));
}
exports.deleteMsgs = deleteMsgs;
//# sourceMappingURL=deleteMsgs.js.map