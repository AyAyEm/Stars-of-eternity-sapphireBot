"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = exports.Item = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
class Item {
    name;
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], Item.prototype, "name", void 0);
exports.Item = Item;
exports.ItemModel = (0, typegoose_1.getModelForClass)(Item);
//# sourceMappingURL=Item.js.map