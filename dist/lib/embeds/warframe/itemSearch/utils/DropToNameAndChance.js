"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropToNameAndChance = void 0;
function dropToNameAndChance(enemy) {
    const { location } = enemy;
    const chance = enemy.chance || 0;
    const [name, dropChance] = location.split(' nce: ', 2);
    const actualChance = dropChance ? Number(dropChance) * chance : chance * 100;
    return { name, chance: actualChance };
}
exports.dropToNameAndChance = dropToNameAndChance;
//# sourceMappingURL=DropToNameAndChance.js.map