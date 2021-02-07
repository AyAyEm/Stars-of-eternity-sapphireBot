/// <reference types="@sapphire/framework" />
/// <reference types="@sapphire/plugin-i18next/dist/register-discordjs" />
import type { EmojiResolvable, MessageReaction } from 'discord.js';
import type { IterableCollection } from 'async';
import type { EternityTextChannel } from './EternityTextChannel';
import type { EternityGuild } from './EternityGuild';
export interface EternityMessage {
    channel: EternityTextChannel;
    guild: EternityGuild;
}
declare const EternityMessage_base: typeof import("discord.js").Message;
export declare class EternityMessage extends EternityMessage_base {
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
export {};
