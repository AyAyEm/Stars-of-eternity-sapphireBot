"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityEvent = void 0;
const framework_1 = require("@sapphire/framework");
class EternityEvent extends framework_1.Event {
    get client() {
        return super.context.client;
    }
}
exports.EternityEvent = EternityEvent;
//# sourceMappingURL=EternityEvent.js.map