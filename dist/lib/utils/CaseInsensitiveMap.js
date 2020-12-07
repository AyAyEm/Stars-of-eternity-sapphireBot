"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CIMap = void 0;
const lowerCase = (key) => (typeof key === 'string' ? key.toLowerCase() : key);
/**
 * Map designed to work with keys case being insensitive.
 */
class CIMap extends Map {
    #dictionary = new Map();
    constructor(entries = []) {
        super();
        entries.forEach(([key, value]) => this.set(key, value));
    }
    clear() {
        this.#dictionary.clear();
        return super.clear();
    }
    delete(key) {
        const parsedKey = this.#dictionary.get(lowerCase(key));
        this.#dictionary.delete(key);
        return super.delete(parsedKey);
    }
    get(key) {
        const parsedKey = this.#dictionary.get(lowerCase(key));
        return super.get(parsedKey);
    }
    has(key) {
        const parsedKey = this.#dictionary.get(lowerCase(key));
        return super.has(parsedKey);
    }
    set(key, value) {
        this.#dictionary.set(lowerCase(key), key);
        return super.set(key, value);
    }
}
exports.CIMap = CIMap;
