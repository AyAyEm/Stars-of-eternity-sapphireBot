import type { Message } from 'discord.js';
import type { Awaitable } from '@sapphire/framework';

export async function deleteMsgs(messages: Awaitable<Message>[]) {
  return Promise.all((await Promise.all(messages)).map((message) => message.delete()));
}
