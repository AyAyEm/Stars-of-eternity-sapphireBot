"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primeWeapon = void 0;
const tslib_1 = require("tslib");
const _lib_1 = require("../../../..");
const utils_1 = require("../utils");
const BaseWeapon_1 = tslib_1.__importDefault(require("./BaseWeapon"));
class WeaponEmbed extends BaseWeapon_1.default {
    get mainInfoPage() {
        const { weapon, baseEmbed: embed } = this;
        const { components = [] } = weapon;
        const primeComponentsString = utils_1.filterForPrimeComponents(components)
            .sort(({ name }) => (name === 'Blueprint' ? -1 : 0))
            .reduce((strings, component) => `${strings}${component.name} **${component.itemCount}**\n`, '');
        embed.addField('Componentes', primeComponentsString || _lib_1.EternityMessageEmbed.blankField.value, false);
        const resourcesString = components
            .filter(({ uniqueName }) => uniqueName.split('/')[3] === 'Items')
            .reduce((string, resource) => `${string}${resource.name} **${resource.itemCount}**\n`, '');
        if (resourcesString)
            embed.addField('Recursos', resourcesString, false);
        return embed;
    }
    get componentsPage() {
        const { weapon, baseEmbed: embed } = this;
        const { components = [] } = weapon;
        const componentsFields = components
            .filter(({ drops = [] }) => drops[0]?.location?.toLowerCase().includes('relic'))
            .sort(({ name }) => (name === 'Blueprint' ? -1 : 1))
            .map((component) => {
            const { name, drops } = component;
            const bestDropsString = utils_1.dropsString(utils_1.bestDrops(drops));
            return { name, value: bestDropsString, inline: false };
        });
        embed.addFields(...componentsFields);
        return embed;
    }
}
function primeWeapon(item) {
    const { mainInfoPage, componentsPage, baseStatusEmbed } = new WeaponEmbed(item);
    const embedMap = new Map();
    embedMap.set('📋', mainInfoPage);
    if (componentsPage)
        embedMap.set('♻', componentsPage);
    embedMap.set('🃏', baseStatusEmbed);
    return embedMap;
}
exports.primeWeapon = primeWeapon;
//# sourceMappingURL=PrimeWeapon.js.map