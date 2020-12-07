"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityBasePiece = void 0;
const framework_1 = require("@sapphire/framework");
class EternityBasePiece extends framework_1.BasePiece {
    get client() {
        return this.extras.client;
    }
}
exports.EternityBasePiece = EternityBasePiece;
