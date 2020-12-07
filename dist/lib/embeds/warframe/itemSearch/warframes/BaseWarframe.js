"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWarframe = void 0;
const discord_js_1 = require("discord.js");
const _utils_1 = require("@utils");
const utils_1 = require("../utils");
class BaseWarframe {
    warframe;
    constructor(warframe) {
        this.warframe = warframe;
    }
    get baseEmbed() {
        const { name, imageName, masteryReq, category, } = this.warframe;
        const embed = new discord_js_1.MessageEmbed();
        embed
            .setTitle(`${name}`)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .addField('Categoria', category, false)
            .setFooter(`Maestria ${masteryReq}`, _utils_1.masteryRankImgs[masteryReq || 0]);
        return embed;
    }
    get bpSource() {
        return utils_1.blueprintSource(this.warframe);
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
    buildPages() {
        const pageNames = Object.keys(this).filter((key) => key.includes('Page'));
        const pages = {};
        const thisPages = this;
        pageNames.forEach((page) => {
            pages[page] = thisPages[page]();
        });
        return pages;
    }
}
exports.BaseWarframe = BaseWarframe;
exports.default = BaseWarframe;
