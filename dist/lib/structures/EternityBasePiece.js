"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EternityBasePiece = void 0;
const framework_1 = require("@sapphire/framework");
class EternityBasePiece extends framework_1.Piece {
    get client() {
        return super.context.client;
    }
}
exports.EternityBasePiece = EternityBasePiece;
//# sourceMappingURL=EternityBasePiece.js.map