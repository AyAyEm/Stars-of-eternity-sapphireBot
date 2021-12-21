import async from 'async';
import FuzzySet from 'fuzzyset.js';
import { container } from '@sapphire/framework';
import { replyLocalized, resolveKey } from '@sapphire/plugin-i18next';
import { ApplyOptions } from '@sapphire/decorators';
import { MessageEmbed, CollectorFilter, Message, User, TextChannel } from 'discord.js';

import type { Args } from '@sapphire/framework';
import type { Item, Category } from 'warframe-items';

import { WarframePagedEmbed, WeaponPagedEmbed, ModPagedEmbed } from '#embeds/warframe/itemSearch';
import { numberEmojis, MultiEntryMap, multiReact } from '#utils';
import { EternityCommand, EternityCommandOptions } from '#lib';

import type { BaseItemPagedEmbed } from '#embeds/warframe/itemSearch/BaseItem';

type ItemCategory = Category | 'Arch-Gun' | 'Arch-Melee';

@ApplyOptions<EternityCommandOptions>({
  aliases: ['wfs'],
  preconditions: ['GuildOnly'],
})
export default class extends EternityCommand {
  public fuzzySet: FuzzySet;

  public categoryDictionary = new MultiEntryMap<ItemCategory, typeof BaseItemPagedEmbed>([
    [['Arch-Gun', 'Arch-Melee', 'Melee', 'Primary', 'Secondary'], WeaponPagedEmbed],
    [['Archwing', 'Warframes'], WarframePagedEmbed],
    [['Mods'], ModPagedEmbed],
  ]);

  public async onLoad() {
    super.onLoad();
    const uniqueNames = await container.warframe.items.getUniqueNames();

    this.fuzzySet = FuzzySet([...uniqueNames.keys()]);
  }

  public async messageRun(msg: Message, args: Args) {
    const { channel } = msg;
    const { fuzzySet } = this;

    const itemName = await args.rest('string');
    const matchedItems: { item: Item, score: number }[] = await async.map(
      fuzzySet.get(itemName).slice(0, 3),
      async ([score, name]) => {
        const item = await container.warframe.items.get(name);
        return { item, score };
      },
    );

    let warframeItem = matchedItems[0].item;
    let noMatchMessage: Message | null = null;
    if ((matchedItems[0].score || 0) < 0.7) {
      const matchItemsString = matchedItems
        .map(({ item }, index: number) => `${numberEmojis[index + 1]} ${item.name} ${item.category}`);

      const noMatchEmbed = new MessageEmbed()
        .setTitle(await resolveKey(msg, 'commands/WFSearch:itemNotFound'))
        .setDescription(await resolveKey(msg, 'commands/WFSearch:selectOneOf', { items: matchItemsString.join('\n\n') }));

      noMatchMessage = (await channel.send({ embeds: [noMatchEmbed] })) as Message;
      const collector = noMatchMessage.createReactionCollector({ time: 15000 });

      const reactions = multiReact(noMatchMessage, [...numberEmojis.slice(1, 4), '❌']);

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
          collector.message.delete();
        }
      });
    }

    const PagedEmbed = this.categoryDictionary.get(warframeItem.category);
    if (PagedEmbed) {
      const filter: CollectorFilter<[unknown, User]> = (_, user) => user.id === msg.author.id;
      const pagedEmbed = new PagedEmbed(
        { 
          client: this.container.client, 
          item: warframeItem, 
          channel: msg.channel as TextChannel, 
        }, 
        { filter },
      );
      pagedEmbed.send(noMatchMessage);
    } else {
      replyLocalized(msg, 'commands/WFSearch:invalidQuery');
    }
  }
}
