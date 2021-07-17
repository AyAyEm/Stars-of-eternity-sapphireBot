import type { Message } from 'discord.js';
import type { Awaited } from '@sapphire/framework';

import type { MessageDeleteOptions } from '#lib/types/Discord';

export async function deleteMsgs(
  messages: Awaited<Message>[],
  options?: MessageDeleteOptions,
) {
  return Promise.all((await Promise.all(messages)).map((message) => message.delete(options)));
}
