"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWarframe = void 0;
const _utils_1 = require("@utils");
const _lib_1 = require("@lib");
const utils_1 = require("../utils");
class BaseWarframe {
    warframe;
    bpSource;
    constructor(warframe) {
        this.warframe = warframe;
        this.bpSource = utils_1.blueprintSource(warframe);
    }
    get baseEmbed() {
        const { name, imageName, masteryReq, category } = this.warframe;
        return new _lib_1.EternityMessageEmbed()
            .setTitle(`${name}`)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .addField('Categoria', category, false)
            .setFooter(`Maestria ${masteryReq}`, _utils_1.masteryRankImgs[masteryReq || 0]);
    }
    get mainInfoPage() {
        const { warframe, bpSource } = this;
        const { components = [], health, armor, shield, power, sprintSpeed, } = warframe;
        const embed = this.baseEmbed;
        embed.addField('Status', `Vida: ${health}\nArmadura: ${armor}\nEscudo: ${shield}\n`
            + `Energia: ${power}\nVelocidade de corrida: ${sprintSpeed}`, false);
        const [resources, componentItems,] = _utils_1.biFilter(components.filter(({ name }) => name !== 'Blueprint'), ({ uniqueName }) => (uniqueName.includes('Items')));
        if ('location' in bpSource && 'id' in bpSource) {
            const blueprintString = bpSource.id === 1
                ? `${bpSource.location} Lab: ${bpSource.lab}`
                : `${bpSource.location}`;
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
}
exports.BaseWarframe = BaseWarframe;
exports.default = BaseWarframe;
//# sourceMappingURL=BaseWarframe.js.map