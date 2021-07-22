"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialItems = void 0;
const _utils_1 = require("../../../utils");
const specialItemsT = _utils_1.translationBy('embeds/itemSearch:specialItems:');
const embedFieldsT = _utils_1.translationBy('embeds/itemSearch:fields:');
const loginWeapon = specialItemsT('loginWeapon', { startDay: '100', example: '100, 300, 500, 700, 900' });
const sigmaWeapon = specialItemsT('loginWeapon', { startDay: '300', example: '300, 500, 700, 900' });
function acquisitionField(value, inline = false) {
    return (embed) => embed.addField(embedFieldsT('acquisition'), value, inline);
}
exports.specialItems = new Map([
    ['Azima', acquisitionField(loginWeapon)],
    ['Zenistar', acquisitionField(loginWeapon)],
    ['Zenith', acquisitionField(loginWeapon)],
    ['Sigma & Octantis', acquisitionField(sigmaWeapon)],
]);
//# sourceMappingURL=SpecialItems.js.map