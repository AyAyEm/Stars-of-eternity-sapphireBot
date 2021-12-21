import { multiReact } from '#utils';

import type {
  CollectorFilter, 
  TextChannel, 
  MessageEmbed, 
  MessageReaction, 
  Message,
  User, 
} from 'discord.js';
import type { SapphireClient } from '@sapphire/framework';

export interface IPage {
  name: string;
  emoji: string;
}

export interface PagedEmbedContext {
  channel: TextChannel;
  client: SapphireClient;
}

export interface EmbedPage extends IPage {
  embed: MessageEmbed;
}

export interface PagedEmbedOptions {
  pages?: IPage[];
  time?: number;
  idle?: number;
  filter?: CollectorFilter<[MessageReaction, User]>;
}

export class PagedEmbed {
  public readonly pages: IPage[];

  public readonly client: SapphireClient;

  public channel: TextChannel;

  public timerOptions: { time: number, idle: number };

  public EmbedPages?: EmbedPage[];

  public filter: CollectorFilter<[MessageReaction, User]>;

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

  public async makeEmbeds(): Promise<EmbedPage[]> {
    return (await Promise.all(this.pages
      .map(async (page) => ({ ...page, embed: await this[page.name]() }))))
      .filter(({ embed }) => embed);
  }

  public async send(toEditMessage?: Message) {
    this.EmbedPages = await this.makeEmbeds();

    const firstPageEmbed = this.EmbedPages[0].embed;
    const msg = toEditMessage
      ? await toEditMessage.edit({ embeds: [firstPageEmbed] })
      : await this.channel.send({ embeds: [firstPageEmbed] });

    const collector = msg
      .createReactionCollector({ filter: this.filter, ...this.timerOptions, dispose: true });

    collector.on('collect', (reaction, user) => {
      if (user.bot) return;

      if (reaction.emoji.name !== '❌') {
        const page = this.EmbedPages.find((p) => p.emoji === reaction.emoji.name);
        if (page) msg.edit({ embeds: [page.embed] });

        collector.resetTimer(this.timerOptions);
        reaction.users.remove(user);
      } else {
        collector.stop('User decided to end it');
      }
    });
    await multiReact(msg, [...this.EmbedPages.map(({ emoji }) => emoji), '❌']);

    collector.on('end', () => collector.message.reactions.removeAll().catch(() => null));
  }
}
