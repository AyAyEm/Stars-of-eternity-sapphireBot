"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropsString = exports.bestDrops = void 0;
const _ = __importStar(require("lodash"));
function bestDrops(drops = []) {
    return drops.sort(({ chance: A }, { chance: B }) => (B || 0) - (A || 0));
}
exports.bestDrops = bestDrops;
function dropsString(drops = []) {
    return _.uniqBy(drops, (drop) => drop.location.split(' ').slice(0, 2).join(' '))
        .reduce((bestDropsString, drop) => {
        const { location } = drop;
        const chance = drop.chance || 0;
        const relicName = location.split(' ').slice(0, 2).join(' ');
        const recomendedTier = location.split(' ')[2];
        return `${bestDropsString}${recomendedTier} **${relicName}** ${Math.round(chance * 100)}%\n`;
    }, '');
}
exports.dropsString = dropsString;
//# sourceMappingURL=RelicDrop.js.map