"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.InitPagedEmbed = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const decorators_1 = require("@sapphire/decorators");
const pagedEmbedPages = new WeakMap();
function InitPagedEmbed(options = {}) {
    return decorators_1.createClassDecorator((target) => {
        const toAddPages = options.pages ?? [];
        return decorators_1.createProxy(target, {
            construct: (Constructor, [context, baseOptions = {}]) => {
                const storedPages = pagedEmbedPages.get(Constructor) ?? [];
                const pages = lodash_1.default.unionBy([...storedPages, ...toAddPages, ...(baseOptions.pages ?? [])], 'name');
                const obj = new Constructor(context, {
                    ...baseOptions,
                    ...options,
                    pages,
                });
                if (target.prototype)
                    Object.setPrototypeOf(obj, target.prototype);
                return obj;
            },
        });
    });
}
exports.InitPagedEmbed = InitPagedEmbed;
function Page(pageOptions) {
    return decorators_1.createMethodDecorator((target, pageName) => {
        const ctor = target.constructor;
        const storedPages = pagedEmbedPages.get(ctor) ?? [];
        const pages = lodash_1.default.unionBy([{ name: pageName, ...pageOptions }, ...storedPages], 'name');
        pagedEmbedPages.set(ctor, pages);
    });
}
exports.Page = Page;
//# sourceMappingURL=PagedEmbed.js.map