import type { IterableCollection } from 'async';
import type { EmojiResolvable, MessageReaction, Message } from 'discord.js';
export declare function multiReact(msg: Message, emojis: IterableCollection<EmojiResolvable>): {
    then: (callback: (reactions: MessageReaction[]) => unknown | Promise<unknown>) => Promise<unknown>;
    stopReactions: () => {
        then: (callback: (reactions: MessageReaction[]) => unknown | Promise<unknown>) => Promise<unknown>;
    };
};
