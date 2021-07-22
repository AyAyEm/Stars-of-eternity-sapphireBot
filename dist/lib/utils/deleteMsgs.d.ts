import type { Message } from 'discord.js';
import type { Awaited } from '@sapphire/framework';
import type { MessageDeleteOptions } from "../types/Discord";
export declare function deleteMsgs(messages: Awaited<Message>[], options?: MessageDeleteOptions): Promise<Message[]>;
