import async from 'async';

import type { IterableCollection } from 'async';
import type { EmojiResolvable, MessageReaction, Message } from 'discord.js';

export function multiReact(msg: Message, emojis: IterableCollection<EmojiResolvable>) {
  let toStop = false;

  const reactions = async.mapSeries<EmojiResolvable, MessageReaction | null>(
    emojis,
    async (emoji) => {
      if (toStop) return null;

      const reaction = await msg.react(emoji);
      // await for the reaction query to finish
      await reaction.fetch();
      return reaction;
    },
  );

  const then = async (callback: (reactions: MessageReaction[]) => unknown | Promise<unknown>) => (
    callback(await reactions));

  const stopReactions = () => {
    toStop = true;
    return { then };
  };

  return { then, stopReactions };
}