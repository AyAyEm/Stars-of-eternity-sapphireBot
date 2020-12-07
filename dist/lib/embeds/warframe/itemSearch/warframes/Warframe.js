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
exports.warframe = void 0;
const _ = __importStar(require("lodash"));
const _utils_1 = require("@utils");
const BaseWarframe_1 = require("./BaseWarframe");
const utils_1 = require("../utils");
class WeaponEmbed extends BaseWarframe_1.BaseWarframe {
    constructor(item) {
        super(item);
        this.warframe = item;
    }
    componentsPage() {
        const { components, category } = this.warframe;
        if (!components)
            return null;
        const [resources, componentItems] = _utils_1.biFilter(components, ({ uniqueName }) => (uniqueName.includes('Items')));
        if (category === 'Warframes') {
            const componentsFields = componentItems
                .filter(({ drops }) => drops)
                .map(({ drops, name }) => {
                const nameAndChance = _.uniqBy(drops, 'location')
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
            this.baseEmbed.addFields(componentsFields);
        }
        else if (category === 'Archwing') {
            const componentsFields = componentItems
                .map(({ name }) => ({ name, value: 'Tenno lab', inline: false }));
            this.baseEmbed.addFields(componentsFields);
        }
        if (resources.length > 0) {
            const resourcesString = resources
                .map(({ name, itemCount }) => `${name} **${itemCount}**`)
                .join('\n');
            this.baseEmbed.addField('Recursos', resourcesString, false);
        }
        return this.baseEmbed;
    }
}
function warframe(item) {
    const warframeEmbed = new WeaponEmbed(item);
    const { mainInfoPage, componentsPage } = warframeEmbed.buildPages();
    const embedMap = new Map();
    embedMap.set('📋', mainInfoPage);
    if (componentsPage)
        embedMap.set('♻', componentsPage);
    return embedMap;
}
exports.warframe = warframe;
