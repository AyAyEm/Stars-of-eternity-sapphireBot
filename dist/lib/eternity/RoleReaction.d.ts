import { MessageReaction, User } from 'discord.js';
import type { EternityEvent } from '../EternityEvent';
export declare function roleReactionManager(this: EternityEvent, messageReaction: MessageReaction, user: User, action: 'add' | 'remove'): Promise<void>;
