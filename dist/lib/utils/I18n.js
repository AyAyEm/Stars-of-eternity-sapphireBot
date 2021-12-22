"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationBy = void 0;
const plugin_i18next_1 = require("@sapphire/plugin-i18next");
function translationBy(target, preKey) {
    return function translate(key, formatOptions) {
        return (0, plugin_i18next_1.resolveKey)(target, `${preKey}${key}`, formatOptions);
    };
}
exports.translationBy = translationBy;
//# sourceMappingURL=I18n.js.map