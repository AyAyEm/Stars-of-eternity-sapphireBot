import i18n from 'i18next';
import { EternityCommandWSC, EternityMessageEmbed } from '@lib';
import { ApplyOptions } from '@sapphire/decorators';
import { UserError } from '@sapphire/framework';
import { itemNames } from '@lib/utils';

import type { EternityCommandWSCOptions, EternityMessage } from '@lib';
import type { InvasionItems } from '@providers/mongoose/models';
import type { Args } from '@sapphire/framework';

@ApplyOptions<EternityCommandWSCOptions>({
  preconditions: ['GuildOnly'],
  requiredArgs: [
    ['add', ['warframeItem']],
    ['delete', ['warframeItem']],
  ],
  subAliases: [
    ['listItems', ['li']],
  ],
  caseInsensitive: true,
})
export default class extends EternityCommandWSC {
  public async document(guildId: string) {
    return new this.client.provider.Guilds(guildId);
  }

  public possibleItemsEmbed = new EternityMessageEmbed()
    .addFields(
      {
        name: i18n.t('commands/Invasion:listItems:commonResources'),
        value: itemNames.commonItems.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/Invasion:listItems:uncommonResources'),
        value: itemNames.uncommonItems.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/Invasion:listItems:rareResources'),
        value: itemNames.rareItems.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/Invasion:listItems:weapons'),
        value: itemNames.weapons.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/Invasion:listItems:bestItems'),
        value: itemNames.goodOnes.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/Invasion:listItems:factionItems'),
        value: itemNames.faction.join(' | '),
        inline: false,
      },
      {
        name: i18n.t('commands/Invasion:listItems:others'),
        value: itemNames.others.join(' | '),
        inline: false,
      },
    )
    .setTitle(i18n.t('commands/Invasion:listItems:title'));

  public items = {
    dictionary: new Map(itemNames.all.map((item) => [item.toLowerCase(), item])),
  };

  public subCommands = {
    items: async (msg: EternityMessage) => {
      const document = await this.document(msg.guild.id);

      const items = await document.get<string[]>(`channels.${msg.channel.id}.invasionItems.items`, []);
      if (items.length === 0) {
        throw new UserError({
          identifier: 'commands/Invasion:items:notFound',
          message: 'No invasion items were found',
        });
      }

      msg.channel.sendTranslated('commands/Invasion:items:found', [{ items }]);
    },

    listItems: async (msg: EternityMessage) => {
      msg.channel.send(this.possibleItemsEmbed);
    },

    disable: async (msg: EternityMessage) => {
      const document = await this.document(msg.guild.id);
      const invasionItems = await document.get<InvasionItems>(`channels.${msg.channel.id}.invasionItems`, {});

      if (!invasionItems.enabled) {
        throw new UserError({
          identifier: 'commands/Invasion:disable:alreadyDisabled',
          message: 'Invasions are already disabled in this channel',
        });
      } else {
        await document.set<InvasionItems['enabled']>(`channels.${msg.channel.id}.invasionItems.enabled`, false);
        (await msg.replyTranslated('commands/Invasion:disable:success')).delete({ timeout: 10000 });
      }
    },

    enable: async (msg: EternityMessage) => {
      const document = await this.document(msg.guild.id);
      const invasionItems = await document.get<InvasionItems>(`channels.${msg.channel.id}.invasionItems`, {});

      if (invasionItems.enabled) {
        throw new UserError({
          identifier: 'commands/Invasion:enable:alreadyEnabled',
          message: 'Invasions are already disabled in this channel',
        });
      } else {
        await document.set<InvasionItems['enabled']>(`channels.${msg.channel.id}.invasionItems.enabled`, true);
        (await msg.replyTranslated('commands/Invasion:enable:success')).delete({ timeout: 10000 });
      }
    },

    add: async (msg: EternityMessage, args: Args) => {
      const document = await this.document(msg.guild.id);
      const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
      const invasionItems = await document.get<InvasionItems>(invasionItemsPath);

      if (!invasionItems) {
        const defaultMessage = 'This channel was not configured for invasions!';
        throw new UserError({
          identifier: 'commands/Invasion:add:channelNotConfigured',
          message: defaultMessage,
        });
      } else {
        const newItems = await args.repeat('warframeItem');
        const parsedNewItems = newItems.map((item) => this.items.dictionary.get(item));
        const itemsData = new Set([...invasionItems.items, ...parsedNewItems]);
        await document.set<InvasionItems['items']>(`${invasionItemsPath}.items`, [...itemsData.values()]);
        msg.replyTranslated('commands/Invasion:add:success', [{ items: newItems }]);
      }
    },

    addAll: async (msg: EternityMessage) => {
      const document = await this.document(msg.guild.id);
      const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
      await document.set<InvasionItems['items']>(`${invasionItemsPath}.items`, itemNames.all);
      msg.replyTranslated('commands/Invasion:addAll:success');
    },

    delete: async (msg: EternityMessage, args: Args) => {
      const document = await this.document(msg.guild.id);
      const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
      const invasionItems = await document.get<InvasionItems>(invasionItemsPath);

      if (!invasionItems) {
        const defaultMessage = 'This channel was not configured for invasions!';
        throw new UserError({
          identifier: 'commands/Invasion:delete:channelNotConfigured',
          message: defaultMessage,
        });
      } else {
        const newItems = await args.repeat('warframeItem');
        const parsedNewItems = newItems.map((item) => this.items.dictionary.get(item));
        const itemsData = invasionItems.items.filter((item) => parsedNewItems.includes(item));
        await document.set<InvasionItems['items']>(`${invasionItemsPath}.items`, [...itemsData.values()]);
        msg.replyTranslated('commands/Invasion:delete:success', [{ items: newItems }]);
      }
    },

    deleteAll: async (msg: EternityMessage) => {
      const document = await this.document(msg.guild.id);
      const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
      await document.set<InvasionItems['items']>(`${invasionItemsPath}.items`, []);
      msg.replyTranslated('commands/Invasion:deleteAll:success');
    },
  };
}
