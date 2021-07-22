/* eslint-disable max-classes-per-file */
import type { CollectorFilter } from 'discord.js';

import { EternityMessageEmbed } from '#lib/extensions';

import type { EternityClient } from '#lib/EternityClient';
import type { EternityTextChannel, EternityMessage } from '#lib/extensions';

export interface IPage {
  name: string;
  emoji: string;
}

export interface PagedEmbedContext {
  channel: EternityTextChannel;
  client: EternityClient;
}

export interface EmbedPage extends IPage {
  embed: EternityMessageEmbed;
}

export interface PagedEmbedOptions {
  pages?: IPage[];
  time?: number;
  idle?: number;
  filter?: CollectorFilter;
}

export class PagedEmbed {
  public readonly pages: IPage[];

  public readonly client: EternityClient;

  public channel: EternityTextChannel;

  public timerOptions: { time: number, idle: number };

  public EmbedPages?: EmbedPage[];

  public filter: CollectorFilter;

  public constructor(context: PagedEmbedContext, options: PagedEmbedOptions = {}) {
    this.channel = context.channel;
    this.client = context.client;

    this.pages = options.pages?.reverse() ?? [];
    this.timerOptions = {
      time: options.time ?? 0,
      idle: options.idle ?? 240000,
    };
    this.filter = options.filter ?? (() => true);
  }

  public makeEmbeds(): EmbedPage[] {
    return this.pages
      .map((page) => ({ ...page, embed: this[page.name]() }))
      .filter(({ embed }) => embed);
  }

  public async send(toEditMessage?: EternityMessage) {
    this.EmbedPages = this.makeEmbeds();

    const firstPageEmbed = this.EmbedPages[0].embed;
    const msg = toEditMessage
      ? await toEditMessage.edit(firstPageEmbed) as EternityMessage
      : await this.channel.send(firstPageEmbed) as EternityMessage;

    const collector = msg
      .createReactionCollector(this.filter, { ...this.timerOptions, dispose: true });

    collector.on('collect', (reaction, user) => {
      if (user.bot) return;

      if (reaction.emoji.name !== '❌') {
        const page = this.EmbedPages.find((p) => p.emoji === reaction.emoji.name);
        if (page) msg.edit(page.embed);

        collector.resetTimer(this.timerOptions);
        reaction.users.remove(user);
      } else {
        collector.stop('User decided to end it');
      }
    });
    await msg.multiReact([...this.EmbedPages.map(({ emoji }) => emoji), '❌']);

    collector.on('end', () => collector.message.reactions.removeAll().catch(() => null));
  }
}
