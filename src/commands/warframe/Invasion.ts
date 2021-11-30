import { capitalize } from 'lodash';
import { replyLocalized, resolveKey, Target } from '@sapphire/plugin-i18next';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository, getConnection } from 'typeorm';

import type { Message, TextChannel } from 'discord.js';
import type { Args } from '@sapphire/framework';
import type { Item as WarframeItem } from 'warframe-items';

import { EternityMessageEmbed } from '#lib';
import { itemNames } from '#utils';
import { CaseInsensitiveMap } from '#structures/CaseInsensitiveMap';
import { WarframeInvasionTracker, WarframeInvasionTrackerRepo, WarframeItemRepo } from '#lib/typeorm';

@ApplyOptions<SubCommandPluginCommandOptions>({
  preconditions: ['GuildOnly'],
  subCommands: [
    'items',
    'disable',
    'enable',
    // {
    //   name: 'add',
    //   requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
    // },
    'add',
    // {
    //   name: 'delete',
    //   aliases: ['remove'],
    //   requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
    // },
    'delete',
    { input: 'remove', output: 'delete' },
  ],
  flags: ['all', 'l', 'list'],
})
export default class extends SubCommandPluginCommand {
  public async possibleItemsEmbed(target: Target) {
    return new EternityMessageEmbed()
      .addFields(
        {
          name: await resolveKey(target, 'commands/invasion:listItems:commonResources'),
          value: itemNames.commonItems.join(' | '),
          inline: false,
        },
        {
          name: await resolveKey(target, 'commands/invasion:listItems:uncommonResources'),
          value: itemNames.uncommonItems.join(' | '),
          inline: false,
        },
        {
          name: await resolveKey(target, 'commands/invasion:listItems:rareResources'),
          value: itemNames.rareItems.join(' | '),
          inline: false,
        },
        {
          name: await resolveKey(target, 'commands/invasion:listItems:weapons'),
          value: itemNames.weapons.join(' | '),
          inline: false,
        },
        {
          name: await resolveKey(target, 'commands/invasion:listItems:bestItems'),
          value: itemNames.goodOnes.join(' | '),
          inline: false,
        },
        {
          name: await resolveKey(target, 'commands/invasion:listItems:factionItems'),
          value: itemNames.faction.join(' | '),
          inline: false,
        },
        {
          name: await resolveKey(target, 'commands/invasion:listItems:others'),
          value: itemNames.others.join(' | '),
          inline: false,
        },
      )
      .setTitle(await resolveKey(target, 'commands/invasion:listItems:title'));
  }

  public itemsDict = new CaseInsensitiveMap<string, WarframeItem>(itemNames.all.map((item) => (
    [item.toLowerCase(), { name: item } as WarframeItem])));

  public get invasionTrackerRepo(): WarframeInvasionTrackerRepo {
    return getCustomRepository(WarframeInvasionTrackerRepo);
  }

  public get itemRepo(): WarframeItemRepo {
    return getCustomRepository(WarframeItemRepo);
  }

  public async items(msg: Message, args: Args) {
    if (args.getFlags('list', 'l')) {
      const items = await this.invasionTrackerRepo.findItemsByChannel(msg.channel as TextChannel);

      if (items.length === 0) {
        await replyLocalized(msg, 'commands/invasion:items:notFound');
      } else {
        await replyLocalized(msg, {
          keys:'commands/invasion:items:found',
          formatOptions: { items: items.map(({ name }) => name) },
        });
      }
    } else {
      await msg.channel.send({ embeds: [await this.possibleItemsEmbed(msg)] });
    }
  }

  public async disable(msg: Message) {
    return this.setEnabled(msg, false);
  }

  public async enable(msg: Message) {
    return this.setEnabled(msg, true);
  }

  private async setEnabled(msg: Message, value: boolean) {
    const invasionTracker = await this.invasionTrackerRepo.findOrInsert(msg.channel as TextChannel);

    const action = value ? 'enable' : 'disable';
    if (invasionTracker.enabled === value) {
      await replyLocalized(msg, `commands/invasion:${action}:already${capitalize(action)}d`);
      return;
    }

    await this.invasionTrackerRepo.createQueryBuilder()
      .update(WarframeInvasionTracker)
      .set({ enabled: value })
      .where('invasion_tracker.id = :invasionTrackerId', { invasionTrackerId: invasionTracker.id })
      .execute();

    const reply = await replyLocalized(msg, `commands/invasion:${action}:success`);
    setTimeout(() => reply.delete(), 10000); 
  }

  public async add(msg: Message, args: Args) {
    return this.updateItems('add', msg, args);
  }

  public async delete(msg: Message, args: Args) {
    return this.updateItems('delete', msg, args);
  }

  private async updateItems(action: 'add' | 'delete', msg: Message, args: Args) {
    const all = args.getFlags('all');

    const toUpdateItems = all ? [...this.itemsDict.keys()] : await args.repeat('warframeItem');

    const storedItems = await this.invasionTrackerRepo.findItemsByChannel(msg.channel as TextChannel);
    const storedItemsNames = new Map(storedItems.map((warframeItem) => (
      [warframeItem.name, warframeItem])));

    const parsedToUpdateItems = toUpdateItems
      .map((item) => (this.itemsDict.get(item)))
      .filter((item) => {
        const hasItem = storedItemsNames.has(item.name);
        return action === 'add' ? !hasItem : hasItem;
      });

    if (parsedToUpdateItems.length <= 0) {
      const actionVerb = action === 'add' ? 'Added' : 'Deleted';

      replyLocalized(
        msg,
        {
          keys: `commands/invasion:${action}:already${actionVerb}${all ? 'All' : ''}`,
          formatOptions: { items: toUpdateItems },
        },
      );
      return;
    }

    const invasionTracker = await this.invasionTrackerRepo.findOrInsert(msg.channel as TextChannel, true);
    await Promise.all(parsedToUpdateItems.map(async (warframeItem: WarframeItem) => {
      const item = await this.itemRepo.findOrInsert(warframeItem);

      const query = getConnection()
        .createQueryBuilder()
        .relation(WarframeInvasionTracker, 'items')
        .of(invasionTracker);

      await (action === 'add' ? query.add(item) : query.remove(item));
    }));

    replyLocalized(
      msg,
      {
        keys: `commands/invasion:${action}:success${all ? 'All' : ''}`,
        formatOptions: { items: [...parsedToUpdateItems].map(({ name }) => name) }, 
      },
    );
  }
}
