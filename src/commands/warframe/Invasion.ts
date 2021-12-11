import { capitalize } from 'lodash';
import { replyLocalized, resolveKey, Target } from '@sapphire/plugin-i18next';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { ApplyOptions } from '@sapphire/decorators';
import { getModelForClass } from '@typegoose/typegoose';

import type { Message } from 'discord.js';
import type { Args } from '@sapphire/framework';
import type { Item as WarframeItem } from 'warframe-items';

import { EternityMessageEmbed } from '#lib';
import { itemNames } from '#utils';
import { CaseInsensitiveMap } from '#structures/CaseInsensitiveMap';
import { InvasionTracker, Item as ItemSchema } from '#schemas';

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

  public async items(msg: Message, args: Args) {
    if (args.getFlags('list', 'l')) {
      const { items } = (await getModelForClass(InvasionTracker).aggregate<{ items: ItemSchema[] }>([
        { $match: { channel: msg.channel.id } },
        {
          $lookup: {
            from: 'items',
            localField: 'items',
            foreignField: '_id',
            as: 'items',
          },
        },
        { $project: { 'items.name': 1, _id: 0 } },
      ]))[0];

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
    const result = await getModelForClass(InvasionTracker).updateOne(
      { channel: msg.channel.id },
      { $set: { enabled: value } },
      { upsert: true, new: true },
    );

    const action = value ? 'enable' : 'disable';
    let reply: Message;
    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      reply = await replyLocalized(msg, `commands/invasion:${action}:already${capitalize(action)}d`);
    } else {
      reply = await replyLocalized(msg, `commands/invasion:${action}:success`);
    }

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

    const ItemsModel = getModelForClass(ItemSchema);
    await ItemsModel.bulkWrite(toUpdateItems.map((itemName) => ({
      updateOne: {
        filter: { name: itemName },
        update: {},
        upsert: true,
      },
    })));

    const items = (await ItemsModel
      .find({ name: { $in: toUpdateItems } }, { _id: 1, name: 0 })
      .exec()).map(({ _id }) => _id);

    const result = await getModelForClass(InvasionTracker).updateOne(
      { channel: msg.channel.id },
      {
        ...(action === 'add' 
          ? { $addToSet: { items: { $each: items } } } 
          : { $pullAll: { items } }),
        $setOnInsert: { enabled: true },
      },
      { upsert: true, new: true },
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      const actionVerb = action === 'add' ? 'Added' : 'Deleted';

      replyLocalized(
        msg,
        {
          keys: `commands/invasion:${action}:already${actionVerb}${all ? 'All' : ''}`,
          formatOptions: { items: toUpdateItems },
        },
      );
      return;
    } else {
      replyLocalized(
        msg,
        {
          keys: `commands/invasion:${action}:success${all ? 'All' : ''}`,
          formatOptions: { items: toUpdateItems }, 
        },
      );
    }
  }
}
