import i18n from 'i18next';
import async from 'async';
import FuzzySet from 'fuzzyset.js';
import { ApplyOptions } from '@sapphire/decorators';
import { MessageEmbed } from 'discord.js';

import type { Args } from '@sapphire/framework';
import type { CollectorFilter } from 'discord.js';
import type { Item, Category } from 'warframe-items';

import { WarframePagedEmbed, WeaponPagedEmbed, ModPagedEmbed } from '#embeds/warframe/itemSearch';
import { numberEmojis, MultiEntryMap } from '#utils';
import { EternityCommand, EternityMessage, EternityCommandOptions } from '#lib';

import type { BaseItemPagedEmbed } from '#embeds/warframe/itemSearch/BaseItem';

type ItemCategory = Category | 'Arch-Gun' | 'Arch-Melee';

@ApplyOptions<EternityCommandOptions>({
  aliases: ['wfs'],
  preconditions: ['GuildOnly'],
})
export default class extends EternityCommand {
  public items = this.client.warframe.items;

  public fuzzySet: FuzzySet;

  public categoryDictionary = new MultiEntryMap<ItemCategory, typeof BaseItemPagedEmbed>([
    [['Arch-Gun', 'Arch-Melee', 'Melee', 'Primary', 'Secondary'], WeaponPagedEmbed],
    [['Archwing', 'Warframes'], WarframePagedEmbed],
    [['Mods'], ModPagedEmbed],
  ]);

  public async onLoad() {
    super.onLoad();
    const uniqueNames = await this.items.getUniqueNames();

    this.fuzzySet = FuzzySet([...uniqueNames.keys()]);
  }

  public async run(msg: EternityMessage, args: Args) {
    const { channel } = msg;
    const { fuzzySet } = this;

    const itemName = await args.rest('string');
    const matchedItems: { item: Item, score: number }[] = await async.map(
      fuzzySet.get(itemName).slice(0, 3),
      async ([score, name]) => {
        const item = await this.items.get(name);
        return { item, score };
      },
    );

    let warframeItem = matchedItems[0].item;
    let noMatchMessage: EternityMessage | null = null;
    if ((matchedItems[0].score || 0) < 0.7) {
      const matchItemsString = matchedItems
        .map(({ item }, index: number) => `${numberEmojis[index + 1]} ${item.name} ${item.category}`);

      const noMatchEmbed = new MessageEmbed()
        .setTitle(i18n.t('commands/WFSearch:itemNotFound'))
        .setDescription(i18n.t('commands/WFSearch:selectOneOf', { items: matchItemsString.join('\n\n') }));

      noMatchMessage = (await channel.send(noMatchEmbed)) as EternityMessage;
      const collector = noMatchMessage
        .createReactionCollector(() => true, { time: 15000 });

      const reactions = noMatchMessage.multiReact([...numberEmojis.slice(1, 4), '❌']);

      let collectedReaction = false;
      collector.on('collect', async (reaction) => {
        if (reaction.emoji.name === '❌') {
          collector.stop('User decided to stop');
        } else if (!collectedReaction) {
          collectedReaction = true;

          await reactions.stopReactions();
          const index = numberEmojis.indexOf(reaction.emoji.name);
          reaction.message.reactions.removeAll();
          collector.stop('Reaction defined');

          warframeItem = matchedItems[index - 1].item;
        }
      });

      collector.on('end', (_, endingReason) => {
        if (endingReason === 'time' || endingReason === 'User decided to stop') {
          msg.delete();
          collector.message.delete({ reason: endingReason });
        }
      });
    }

    const PagedEmbed = this.categoryDictionary.get(warframeItem.category);
    if (PagedEmbed) {
      const context = { client: this.client, item: warframeItem, channel: msg.channel };
      const filter: CollectorFilter = (_, user) => user.id === msg.author.id;
      const pagedEmbed = new PagedEmbed(context, { filter });
      pagedEmbed.send(noMatchMessage);
    } else {
      msg.replyTranslated('commands/WFSearch:invalidQuery');
    }
  }
}
