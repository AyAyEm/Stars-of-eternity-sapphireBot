"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warframe = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const _utils_1 = require("../../../../utils");
const BaseWarframe_1 = require("./BaseWarframe");
const utils_1 = require("../utils");
class WeaponEmbed extends BaseWarframe_1.BaseWarframe {
    get componentsPage() {
        const { components, category } = this.warframe;
        const embed = this.baseEmbed;
        if (!components)
            return null;
        const [resources, componentItems] = _utils_1.biFilter(components, ({ uniqueName }) => (uniqueName.includes('Items')));
        if (category === 'Warframes') {
            const componentsFields = componentItems
                .filter(({ drops }) => drops)
                .map(({ drops, name }) => {
                const nameAndChance = lodash_1.default.uniqBy(drops, 'location')
                    .map((drop) => utils_1.dropToNameAndChance(drop))
                    .sort(({ chance: a }, { chance: b }) => {
                    if (a === b)
                        return 0;
                    return a < b ? 1 : -1;
                })
                    .slice(0, 3);
                const dataString = nameAndChance
                    .map(({ name: enemyName, chance }) => `${enemyName} **${Math.round(chance * 100) / 100}%**`)
                    .join('\n');
                return { name, value: dataString, inline: false };
            });
            embed.addFields(componentsFields);
        }
        else if (category === 'Archwing') {
            const componentsFields = componentItems
                .map(({ name }) => ({ name, value: 'Tenno lab', inline: false }));
            embed.addFields(componentsFields);
        }
        if (resources.length > 0) {
            const resourcesString = resources
                .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                .join('\n');
            embed.addField('Recursos', resourcesString, false);
        }
        return embed;
    }
}
function warframe(item) {
    const { mainInfoPage, componentsPage } = new WeaponEmbed(item);
    const embedMap = new Map();
    embedMap.set('📋', mainInfoPage);
    if (componentsPage)
        embedMap.set('♻', componentsPage);
    return embedMap;
}
exports.warframe = warframe;
//# sourceMappingURL=Warframe.js.map