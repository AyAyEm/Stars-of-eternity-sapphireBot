import i18n from 'i18next';

import { capitalize } from 'lodash';
import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository, getConnection } from 'typeorm';

import type { Args } from '@sapphire/framework';
import type { Item as WarframeItem } from 'warframe-items';

import { itemNames } from '#lib/utils';
import { EternityCommandWSC, EternityMessageEmbed } from '#lib';
import { CaseInsensitiveMap } from '#structures/CaseInsensitiveMap';
import { InvasionTracker, InvasionTrackerRepository, ItemRepository } from '#lib/typeorm';

import type { EternityCommandWSCOptions, EternityMessage } from '#lib';

@ApplyOptions<EternityCommandWSCOptions>({
  preconditions: ['GuildOnly'],
  subCommands: [
    { name: 'items', flags: ['list', 'l'] },
    'disable',
    'enable',
    {
      name: 'add',
      requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
    },
    {
      name: 'delete',
      aliases: ['remove'],
      requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
    },
  ],
  strategyOptions: {
    flags: ['all'],
  },
  caseInsensitive: true,
})
export default class extends EternityCommandWSC {
  public possibleItemsEmbed = new EternityMessageEmbed()
    .addFields(
      {
        name: i18n.t('commands/invasion:listItems:commonResources'),
        value: itemNames.commonItems.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/invasion:listItems:uncommonResources'),
        value: itemNames.uncommonItems.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/invasion:listItems:rareResources'),
        value: itemNames.rareItems.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/invasion:listItems:weapons'),
        value: itemNames.weapons.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/invasion:listItems:bestItems'),
        value: itemNames.goodOnes.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/invasion:listItems:factionItems'),
        value: itemNames.faction.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/invasion:listItems:others'),
        value: itemNames.others.join(' | '),
        inline: false,
      },
    )
    .setTitle(i18n.t('commands/invasion:listItems:title'));

  public itemsDict = new CaseInsensitiveMap<string, WarframeItem>(itemNames.all.map((item) => (
    [item.toLowerCase(), { name: item } as WarframeItem])));

  public get invasionTrackerRepo(): InvasionTrackerRepository {
    return getCustomRepository(InvasionTrackerRepository);
  }

  public get itemRepo(): ItemRepository {
    return getCustomRepository(ItemRepository);
  }

  public async items(msg: EternityMessage, args: Args) {
    if (args.getFlags('list', 'l')) {
      const items = await this.invasionTrackerRepo.findItemsByChannel(msg.channel);

      if (items.length === 0) {
        await msg.replyTranslated('commands/invasion:items:notFound');
      } else {
        await msg.replyTranslated(
          'commands/invasion:items:found',
          [{ items: items.map(({ name }) => name) }],
        );
      }
    } else {
      await msg.channel.send(this.possibleItemsEmbed);
    }
  }

  public async disable(msg: EternityMessage) {
    return this.setEnabled(msg, false);
  }

  public async enable(msg: EternityMessage) {
    return this.setEnabled(msg, true);
  }

  private async setEnabled(msg: EternityMessage, value: boolean) {
    const invasionTracker = await this.invasionTrackerRepo.findOrInsert(msg.channel);

    const action = value ? 'enable' : 'disable';
    if (invasionTracker.enabled === value) {
      await msg.replyTranslated(`commands/invasion:${action}:already${capitalize(action)}d`);
      return;
    }

    await this.invasionTrackerRepo.createQueryBuilder()
      .update(InvasionTracker)
      .set({ enabled: value })
      .where('invasion_tracker.id = :invasionTrackerId', { invasionTrackerId: invasionTracker.id })
      .execute();

    const reply = await msg.replyTranslated(`commands/invasion:${action}:success`);
    reply.delete({ timeout: 10000 });
  }

  public async add(msg: EternityMessage, args: Args) {
    return this.updateItems('add', msg, args);
  }

  public async delete(msg: EternityMessage, args: Args) {
    return this.updateItems('delete', msg, args);
  }

  private async updateItems(action: 'add' | 'delete', msg: EternityMessage, args: Args) {
    const all = args.getFlags('all');

    const toUpdateItems = all ? [...this.itemsDict.keys()] : await args.repeat('warframeItem');

    const storedItems = await this.invasionTrackerRepo.findItemsByChannel(msg.channel);
    const storedItemsNames = new Map(storedItems.map((warframeItem) => (
      [warframeItem.name, warframeItem])));

    const parsedToUpdateItems = toUpdateItems
      .map((item) => (this.itemsDict.get(item)))
      .filter((item) => {
        const hasItem = storedItemsNames.has(item.name);
        return action === 'add' ? !hasItem : hasItem;
      });

    if (parsedToUpdateItems.length <= 0) {
      msg.replyTranslated(
        `commands/invasion:${action}:already${action === 'add' ? 'Added' : 'Deleted'}${all ? 'All' : ''}`,
        [{ items: toUpdateItems }],
      );
      return;
    }

    const invasionTracker = await this.invasionTrackerRepo.findOrInsert(msg.channel, true);
    await Promise.all(parsedToUpdateItems.map(async (warframeItem: WarframeItem) => {
      const item = await this.itemRepo.findOrInsert(warframeItem);

      const query = getConnection()
        .createQueryBuilder()
        .relation(InvasionTracker, 'items')
        .of(invasionTracker);

      await (action === 'add' ? query.add(item) : query.remove(item));
    }));

    msg.replyTranslated(
      `commands/invasion:${action}:success${all ? 'All' : ''}`,
      [{ items: [...parsedToUpdateItems].map(({ name }) => name) }],
    );
  }
}
