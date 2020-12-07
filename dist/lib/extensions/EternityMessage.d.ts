/// <reference types="@sapphire/framework/dist/lib/sapphireclient" />
/// <reference types="@sapphire/framework/dist/lib/types/events" />
/// <reference types="@scp/in17n/dist/lib/in17n" />
import { SapphireMessage } from '@sapphire/framework';
import type { EmojiResolvable, MessageReaction, MessageOptions, MessageAdditions, SplitOptions } from 'discord.js';
import type { IterableCollection } from 'async';
import type { EternityGuild } from './EternityGuild';
import type { EternityTextChannel } from './EternityTextChannel';
export interface EternityMessage {
    guild: EternityGuild;
    channel: EternityTextChannel;
}
export declare class EternityMessage extends SapphireMessage {
    replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
        split?: false;
    }) | MessageAdditions): Promise<EternityMessage>;
    replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
        split: true | SplitOptions;
    }): Promise<EternityMessage[]>;
    replyTranslated(key: string, options?: MessageOptions | (MessageOptions & {
        split?: false;
    }) | MessageAdditions): Promise<EternityMessage>;
    replyTranslated(key: string, options?: MessageOptions & {
        split: true | SplitOptions;
    }): Promise<EternityMessage[]>;
    replyAndDelete(content: string, options?: {
        timeout: number;
        reason: string;
        delSource: boolean;
    }): Promise<import("discord.js").Message>;
    /**
     * Reacts with a list of emojis sequentially.
     * @param emojis A list of emojis.
     * @return A thenable object with stopReactions method.
     */
    multiReact(emojis: IterableCollection<EmojiResolvable>): {
        then: (callback: (reactions: MessageReaction[]) => unknown | Promise<unknown>) => Promise<unknown>;
        stopReactions: () => void;
    };
}
