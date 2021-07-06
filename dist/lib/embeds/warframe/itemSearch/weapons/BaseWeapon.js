"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _lib_1 = require("@lib");
const Constants_1 = require("@utils/Constants");
class BaseWeapon {
    weapon;
    constructor(weapon) {
        this.weapon = weapon;
    }
    get baseEmbed() {
        const { name, type, imageName, category, masteryReq, disposition = 1, } = this.weapon;
        const fields = [{ name: 'Categoria', value: category, inline: true }];
        if (type)
            fields.push({ name: 'Tipo', value: type, inline: true });
        return new _lib_1.EternityMessageEmbed()
            .setTitle(`${name} ${Constants_1.rivenDisposition[disposition - 1]}`)
            .addFields(fields)
            .setThumbnail(`https://cdn.warframestat.us/img/${imageName}`)
            .setFooter(`Maestria ${masteryReq}`, Constants_1.masteryRankImgs[masteryReq || 0]);
    }
    get baseStatusEmbed() {
        const { baseEmbed: embed, weapon } = this;
        const { criticalChance, criticalMultiplier, procChance, fireRate, accuracy, trigger, magazineSize, reloadTime, ammo, damageTypes = {}, totalDamage, projectile, category,
        // flight,secondary,areaAttack, damage, multishot, noise,
         } = weapon;
        const embedStrings = {
            chance: `Chance: ${Math.round((criticalChance || 0) * 100)}%\nMultiplicador: ${criticalMultiplier}x`,
            status: `Chance: ${Math.round((procChance || 0) * 100)}%`,
            damage: `${Object.entries(damageTypes).map(([type, dmg]) => `${type}: ${dmg}`).join('\n')}`,
            munition: `Pente: ${magazineSize}\nTotal: ${ammo}`,
            utility: `${category === 'Melee' ? `Velocidade de ataque: ${fireRate?.toFixed(3)}` : `Taxa de tiro: ${fireRate}/s`}`
                + `${trigger ? `\nGatilho: ${trigger}` : ''}`
                + `${projectile ? `\nProjétil: ${projectile}` : ''}`
                + `${reloadTime ? `\nRecarga: ${reloadTime}s` : ''}`
                + `${accuracy ? `\nPrecisão: ${accuracy}` : ''}`,
        };
        const fields = [
            { name: `Dano ${totalDamage}`, value: embedStrings.damage, inline: false },
            { name: 'Crítico', value: embedStrings.chance, inline: false },
            { name: 'Status', value: embedStrings.status, inline: false },
            { name: 'Utilidade', value: embedStrings.utility, inline: false },
        ];
        if (ammo)
            fields.push({ name: 'Munição', value: embedStrings.munition, inline: true });
        embed.addFields(fields);
        return embed;
    }
}
exports.default = BaseWeapon;
//# sourceMappingURL=BaseWeapon.js.map