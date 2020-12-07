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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weapon = void 0;
const BiFilter_1 = require("@utils/BiFilter");
const _ = __importStar(require("lodash"));
const BaseWeapon_1 = __importDefault(require("./BaseWeapon"));
const utils_1 = require("../utils");
const SpecialItems_1 = __importDefault(require("../SpecialItems"));
class WeaponEmbed extends BaseWeapon_1.default {
    get bpSource() {
        return utils_1.blueprintSource(this.weapon);
    }
    get mainInfoPage() {
        const { baseEmbed: embed } = this;
        const { name: weaponName } = this.weapon;
        const specialAdjustment = SpecialItems_1.default.get(weaponName);
        if (specialAdjustment) {
            return specialAdjustment(embed);
        }
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
        if (!('location' in this.bpSource) || this.bpSource.location !== 'Drop')
            return null;
        if (!components)
            return null;
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
    const weaponEmbed = new WeaponEmbed(item);
    const { mainInfoPage, componentsPage, baseStatusEmbed } = weaponEmbed;
    const embedMap = new Map();
    embedMap.set('📋', mainInfoPage);
    if (componentsPage)
        embedMap.set('♻', componentsPage);
    embedMap.set('🃏', baseStatusEmbed);
    return embedMap;
}
exports.weapon = weapon;
