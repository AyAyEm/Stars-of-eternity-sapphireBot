"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseItemPagedEmbed = void 0;
const _structures_1 = require("../../../structures");
const _utils_1 = require("../../../utils");
class BaseItemPagedEmbed extends _structures_1.PagedEmbed {
    item;
    t = (0, _utils_1.translationBy)(this.channel, 'embeds/itemSearch:');
    constructor(context, options) {
        super(context, options);
        this.item = context.item;
    }
}
exports.BaseItemPagedEmbed = BaseItemPagedEmbed;
//# sourceMappingURL=BaseItem.js.map