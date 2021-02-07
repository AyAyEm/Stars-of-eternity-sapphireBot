import async from 'async';
import { Structures } from 'discord.js';

import type { EmojiResolvable, MessageReaction } from 'discord.js';

import type { IterableCollection } from 'async';

import type { EternityTextChannel } from './EternityTextChannel';
import type { EternityGuild } from './EternityGuild';

export interface EternityMessage {
  channel: EternityTextChannel;
  guild: EternityGuild;
}

export class EternityMessage extends Structures.get('Message') {
  /**
   * Reacts with a list of emojis sequentially.
   * @param emojis A list of emojis.
   * @return A thenable object with stopReactions method.
   */
  public multiReact(emojis: IterableCollection<EmojiResolvable>) {
    let toStop = false;
    const stopReactions = () => { toStop = true; };

    const reactions = async.mapSeries<EmojiResolvable, MessageReaction | null>(emojis,
      async (emoji) => {
        if (toStop) return null;

        const reaction = await this.react(emoji);
        // await for the reaction query to finish
        await reaction.fetch();
        return reaction;
      });

    const then = async (callback: (reactions: MessageReaction[]) => unknown | Promise<unknown>) => (
      callback(await reactions));

    return { then, stopReactions };
  }
}
