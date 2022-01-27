import type { Item } from 'warframe-items';

import { PagedEmbed } from '#structures';
import { translationBy } from '#utils';

import type { PagedEmbedContext, PagedEmbedOptions } from '#structures';

export interface BaseItemPagedEmbedContext extends PagedEmbedContext {
  item: Item;
}

export class BaseItemPagedEmbed extends PagedEmbed {
  public item: Item;

  protected t = translationBy(this.channel, 'embeds/itemSearch:');

  public constructor(context: BaseItemPagedEmbedContext, options?: PagedEmbedOptions) {
    super(context, options);

    this.item = context.item;
  }
}
