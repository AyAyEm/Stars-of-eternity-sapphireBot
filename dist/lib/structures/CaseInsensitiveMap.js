"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseInsensitiveMap = void 0;
class CaseInsensitiveMap extends Map {
    #dict;
    constructor(entries) {
        super();
        this.#dict = new Map();
        entries.forEach(([key, value]) => this.set(key, value));
    }
    get(key) {
        return super.get(this.#dict.get(`${key}`.toLowerCase()));
    }
    set(key, value) {
        this.#dict.set(`${key}`.toLowerCase(), `${key}`);
        return super.set(key, value);
    }
    has(key) {
        return this.#dict.has(`${key}`.toLowerCase());
    }
    delete(key) {
        const loweredKey = `${key}`.toLowerCase();
        super.delete(this.#dict.get(loweredKey));
        return this.#dict.delete(loweredKey);
    }
    clear() {
        this.#dict.clear();
        return super.clear();
    }
}
exports.CaseInsensitiveMap = CaseInsensitiveMap;
//# sourceMappingURL=CaseInsensitiveMap.js.map