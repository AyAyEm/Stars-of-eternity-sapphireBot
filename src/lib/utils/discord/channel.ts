import type { Collection, GuildMember, TextChannel, VoiceChannel } from 'discord.js';

export interface SendAndDeleteOptions {
  content: string,
  timeout?: number,
}

export async function sendAndDelete(channel: TextChannel, options: SendAndDeleteOptions | string) {
  const content = typeof options === 'string' ? options : options.content;
  const timeout = typeof options === 'string' || !options.timeout ? 10000 : options.timeout; 

  const message = await channel.send(content);

  return new Promise((resolve) => {
    setTimeout(() => resolve(message.delete()), timeout);
  });
}

export function onlyMembers(channel: VoiceChannel): Collection<string, GuildMember> {
  return channel.members.filter((guildMember) => !guildMember.user.bot);
}
