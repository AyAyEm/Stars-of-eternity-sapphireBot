"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedEmbed = void 0;
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
    makeEmbeds() {
        return this.pages
            .map((page) => ({ ...page, embed: this[page.name]() }))
            .filter(({ embed }) => embed);
    }
    async send(toEditMessage) {
        this.EmbedPages = this.makeEmbeds();
        const firstPageEmbed = this.EmbedPages[0].embed;
        const msg = toEditMessage
            ? await toEditMessage.edit(firstPageEmbed)
            : await this.channel.send(firstPageEmbed);
        const collector = msg
            .createReactionCollector(this.filter, { ...this.timerOptions, dispose: true });
        collector.on('collect', (reaction, user) => {
            if (user.bot)
                return;
            if (reaction.emoji.name !== '❌') {
                const page = this.EmbedPages.find((p) => p.emoji === reaction.emoji.name);
                if (page)
                    msg.edit(page.embed);
                collector.resetTimer(this.timerOptions);
                reaction.users.remove(user);
            }
            else {
                collector.stop('User decided to end it');
            }
        });
        await msg.multiReact([...this.EmbedPages.map(({ emoji }) => emoji), '❌']);
        collector.on('end', () => collector.message.reactions.removeAll().catch(() => null));
    }
}
exports.PagedEmbed = PagedEmbed;
//# sourceMappingURL=PagedEmbed.js.map