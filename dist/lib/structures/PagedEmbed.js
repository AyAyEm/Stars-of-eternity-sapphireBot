"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedEmbed = void 0;
const _utils_1 = require("../utils");
class PagedEmbed {
    pages;
    client;
    channel;
    timerOptions;
    EmbedPages;
    filter;
    constructor(context, options = {}) {
        this.channel = context.channel;
        this.client = context.client;
        this.pages = options.pages?.reverse() ?? [];
        this.timerOptions = {
            time: options.time ?? 0,
            idle: options.idle ?? 240000,
        };
        this.filter = options.filter ?? (() => true);
    }
    async makeEmbeds() {
        return (await Promise.all(this.pages
            .map(async (page) => ({ ...page, embed: await this[page.name]() }))))
            .filter(({ embed }) => embed);
    }
    async send(toEditMessage) {
        this.EmbedPages = await this.makeEmbeds();
        const firstPageEmbed = this.EmbedPages[0].embed;
        const msg = toEditMessage
            ? await toEditMessage.edit({ embeds: [firstPageEmbed] })
            : await this.channel.send({ embeds: [firstPageEmbed] });
        const collector = msg
            .createReactionCollector({ filter: this.filter, ...this.timerOptions, dispose: true });
        collector.on('collect', (reaction, user) => {
            if (user.bot)
                return;
            if (reaction.emoji.name !== '❌') {
                const page = this.EmbedPages.find((p) => p.emoji === reaction.emoji.name);
                if (page)
                    msg.edit({ embeds: [page.embed] });
                collector.resetTimer(this.timerOptions);
                reaction.users.remove(user);
            }
            else {
                collector.stop('User decided to end it');
            }
        });
        await (0, _utils_1.multiReact)(msg, [...this.EmbedPages.map(({ emoji }) => emoji), '❌']);
        collector.on('end', () => collector.message.reactions.removeAll().catch(() => null));
    }
}
exports.PagedEmbed = PagedEmbed;
//# sourceMappingURL=PagedEmbed.js.map