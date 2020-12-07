"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiEntryMap = void 0;
class MultiEntryMap extends Map {
    constructor(entries) {
        super();
        entries.forEach(([keys, value]) => keys.forEach((key) => this.set(key, value)));
    }
}
exports.MultiEntryMap = MultiEntryMap;
exports.default = MultiEntryMap;
