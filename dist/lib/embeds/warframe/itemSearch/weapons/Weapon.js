"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weapon = void 0;
const tslib_1 = require("tslib");
const BiFilter_1 = require("../../../../utils/BiFilter");
const _ = tslib_1.__importStar(require("lodash"));
const BaseWeapon_1 = tslib_1.__importDefault(require("./BaseWeapon"));
const utils_1 = require("../utils");
const SpecialItems_1 = tslib_1.__importDefault(require("../SpecialItems"));
class WeaponEmbed extends BaseWeapon_1.default {
    bpSource = utils_1.blueprintSource(this.weapon);
    get mainInfoPage() {
        const { baseEmbed: embed } = this;
        const { name: weaponName } = this.weapon;
        const specialAdjustment = SpecialItems_1.default.get(weaponName);
        if (specialAdjustment)
            return specialAdjustment(embed);
        const components = this.weapon.components || [];
        const [resources, componentItems] = BiFilter_1.biFilter(components.filter(({ name }) => name !== 'Blueprint'), ({ uniqueName }) => (uniqueName.includes('Items')));
        if ('id' in this.bpSource && 'location' in this.bpSource) {
            const blueprintString = this.bpSource.id === 1
                ? `${this.bpSource.location} Lab: ${this.bpSource.lab}`
                : `${this.bpSource.location}`;
            embed.addField('Blueprint', blueprintString, false);
        }
        if (componentItems.length > 0) {
            const componentsString = componentItems
                .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                .join('\n');
            embed.addField('Componentes', componentsString, false);
        }
        if (resources.length > 0) {
            const resourcesNames = resources.map(({ name: resourceName, itemCount }) => (`${resourceName} **${itemCount}**`));
            const resourcesString = resourcesNames.join('\n');
            embed.addField('Recursos', resourcesString, false);
        }
        return embed;
    }
    get componentsPage() {
        const { baseEmbed } = this;
        const { components } = this.weapon;
        if (!('location' in this.bpSource) || this.bpSource.location !== 'Drop' || !components) {
            return null;
        }
        const [resources, componentItems] = BiFilter_1.biFilter(components, ({ uniqueName }) => (uniqueName.includes('Items')));
        const componentsFields = componentItems.map(({ drops, name }) => {
            const nameAndChance = _.uniqBy(drops, 'location')
                .map((drop) => utils_1.dropToNameAndChance(drop))
                .sort(({ chance: A }, { chance: B }) => B - A)
                .slice(0, 3);
            const dataString = nameAndChance
                .map(({ name: enemyName, chance }) => `${enemyName} **${Math.round(chance * 100) / 100}%**`)
                .join('\n');
            return { name, value: dataString, inline: false };
        });
        baseEmbed.addFields(componentsFields);
        if (resources.length > 0) {
            const resourcesString = resources
                .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                .join('\n');
            baseEmbed.addField('Recursos', resourcesString, false);
        }
        return baseEmbed;
    }
}
function weapon(item) {
    const { mainInfoPage, componentsPage, baseStatusEmbed } = new WeaponEmbed(item);
    const embedMap = new Map();
    embedMap.set('📋', mainInfoPage);
    if (componentsPage)
        embedMap.set('♻', componentsPage);
    embedMap.set('🃏', baseStatusEmbed);
    return embedMap;
}
exports.weapon = weapon;
//# sourceMappingURL=Weapon.js.map