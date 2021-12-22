import type { Message } from 'discord.js';
import type { Awaitable } from '@sapphire/framework';
export declare function deleteMsgs(messages: Awaitable<Message>[]): Promise<Message<boolean>[]>;
