"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityCommand {
    async run(msg, args) {
        const embed = new discord_js_1.MessageEmbed()
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
        const query = await args.rest('string');
        const code = (lang, c) => (`\`\`\`${lang}\n${String(c).slice(0, 1000) + (c.length >= 1000 ? '...' : '')}\n\`\`\``).replace(this.client.token, '*'.repeat(this.client.token.length));
        if (!query)
            msg.channel.send('Please, write something so I can evaluate!');
        else {
            try {
                // eslint-disable-next-line no-eval
                const evald = eval(query);
                const res = typeof evald === 'string' ? evald : util_1.inspect(evald, { depth: 0 });
                embed.addField('Result', code('js', res));
                if (!res || (!evald && evald !== 0))
                    embed.setColor('RED');
                else {
                    embed
                        .addField('Type', code('css', typeof evald))
                        .setColor('GREEN');
                }
            }
            catch (error) {
                embed
                    .addField('Error', code('js', error))
                    .setColor('RED');
            }
            finally {
                msg.channel.send(embed).catch((error) => {
                    msg.channel.send(`There was an error while displaying the eval result! ${error.message}`);
                });
            }
        }
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        preconditions: ['OwnerOnly'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Eval.js.map