"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropsString = exports.bestDrops = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash"));
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