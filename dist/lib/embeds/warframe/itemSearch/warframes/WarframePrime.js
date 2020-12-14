"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warframePrime = void 0;
const _lib_1 = require("@lib");
const BaseWarframe_1 = require("./BaseWarframe");
const utils_1 = require("../utils");
class WarframePrimeEmbed extends BaseWarframe_1.BaseWarframe {
    get componentsPage() {
        const { warframe: weapon, baseEmbed: embed } = this;
        const { components = [] } = weapon;
        const componentsFields = utils_1.filterForPrimeComponents(components)
            .sort(({ name }) => (name === 'Blueprint' ? -1 : 1))
            .map((component) => {
            const { name, drops } = component;
            const bestDropsString = utils_1.dropsString(utils_1.bestDrops(drops)) || _lib_1.EternityMessageEmbed;
            return { name, value: bestDropsString, inline: false };
        });
        embed.addFields(...componentsFields);
        return embed;
    }
}
function warframePrime(item) {
    const { mainInfoPage, componentsPage } = new WarframePrimeEmbed(item);
    const embedMap = new Map();
    embedMap.set('📋', mainInfoPage);
    embedMap.set('♻', componentsPage);
    return embedMap;
}
exports.warframePrime = warframePrime;
//# sourceMappingURL=WarframePrime.js.map