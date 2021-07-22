"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fissuresEmbed = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../../config");
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const _lib_1 = require("../..");
// Fissures: Lith, Meso, Neo, Axi and Requiem
const fissureIcons = [
    'https://i.imgur.com/ZSxJCTI.png',
    'https://i.imgur.com/JR0s2vZ.png',
    'https://i.imgur.com/JNv2xcR.png',
    'https://i.imgur.com/sk2WIeA.png',
    'https://i.imgur.com/CNdPs70.png',
];
const fissureTiers = new Map(['Lith', 'Meso', 'Neo', 'Axi', 'Requiem']
    .map((tier, index) => [tier, { index, icon: fissureIcons[index] }]));
function fissureToString({ node }) {
    const [mission, map] = [node.split(' ')[0], node.split(' ').slice(1).join(' ')];
    // const expirationString = moment.tz(expiry, timezone).format('HH:mm');
    return `***${map.replace(/[()]/g, '')}***    *${mission}*\n`;
}
function missionFissuresToString(missionFissures) {
    return missionFissures
        .reduce((nodes, missionFissure) => `${nodes}${fissureToString(missionFissure)}`, '');
}
function getMissionsFields(missionFissures) {
    const expirationString = missionFissures.reduce((expirations, { expiry }) => {
        const expiration = moment_timezone_1.default.tz(expiry, config_1.timezone).format('HH:mm');
        return `${expirations}*${expiration}*\n`;
    }, '');
    const enemyFactions = missionFissures.reduce((factions, { enemy }) => `${factions}${enemy}\n`, '');
    return [{
            name: `${missionFissures[0].missionType}`,
            value: missionFissuresToString(missionFissures),
            inline: true,
        }, {
            name: 'Facção',
            value: enemyFactions,
            inline: true,
        }, {
            name: 'Expira ás',
            value: expirationString,
            inline: true,
        }];
}
function fissuresEmbed(fissures) {
    const fissuresMap = new Map([...Object.entries((lodash_1.default.groupBy(fissures, 'tier')))]
        .sort(([tierA], [tierB]) => {
        const { index: A = 0 } = fissureTiers.get(tierA) || {};
        const { index: B = 0 } = fissureTiers.get(tierB) || {};
        return B - A;
    }));
    const embedsMap = new Map();
    fissuresMap.forEach((tierFissures, tier) => {
        const { icon, index: tierNumber } = fissureTiers.get(tier) || {};
        const missionsTypes = lodash_1.default.uniqBy(tierFissures, 'missionType')
            .reduce((types, { missionType }, index, uniqFissures) => (`${types} ${missionType}${index === uniqFissures.length - 1 ? '' : ','}`), '');
        const groupedByType = lodash_1.default.groupBy(tierFissures, 'missionType');
        const fields = Object.values(groupedByType)
            .flatMap(([...missionFissures]) => getMissionsFields(missionFissures));
        const embed = new _lib_1.EternityMessageEmbed()
            .setTitle(`${tier} fendas ativas: ${tierFissures.length}`)
            .setAuthor(missionsTypes)
            .setDescription('')
            .setThumbnail(icon || '')
            .setTimestamp()
            .setFooter('Horário de São Paulo')
            .addFields(...fields);
        embedsMap.set(tierNumber + 1, embed);
    });
    return embedsMap;
}
exports.fissuresEmbed = fissuresEmbed;
exports.default = fissuresEmbed;
//# sourceMappingURL=FissureTracker.js.map