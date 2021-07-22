"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseInsensitiveSet = void 0;
class CaseInsensitiveSet extends Set {
    constructor(keys) {
        super();
        keys.forEach((key) => this.add(key.toLowerCase()));
    }
    add(key) {
        return super.add(key.toLowerCase());
    }
    has(key) {
        return super.has(key.toLowerCase());
    }
    delete(key) {
        return super.delete(key.toLowerCase());
    }
    clear() {
        return super.clear();
    }
}
exports.CaseInsensitiveSet = CaseInsensitiveSet;
//# sourceMappingURL=CaseInsensitiveSet.js.map