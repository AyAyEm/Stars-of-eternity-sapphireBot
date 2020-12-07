"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const weapons_1 = require("./weapons");
const warframes_1 = require("./warframes");
const Mod_1 = require("./Mod");
const isPrime = ({ name }) => name.includes('Prime');
const typeFunctions = new Map([
    ['Weapons', (item) => (isPrime(item) ? weapons_1.primeWeapon(item) : weapons_1.weapon(item))],
    ['Warframes', (item) => (isPrime(item) ? warframes_1.warframePrime(item) : warframes_1.warframe(item))],
    ['Mods', Mod_1.mod],
]);
const typeDictionary = new _utils_1.MultiEntryMap([
    [['Arch-Gun', 'Arch-Melee', 'Melee', 'Primary', 'Secondary'], 'Weapons'],
    [['Archwing', 'Warframes'], 'Warframes'],
    [['Mods'], 'Mods'],
]);
exports.default = (item) => {
    const type = typeDictionary.get(item.category);
    const typeFunction = typeFunctions.get(type);
    return typeFunction ? typeFunction(item) : null;
};
