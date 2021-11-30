import type { VoiceChannel, Guild, Collection } from 'discord.js';

export function voiceChannels(guild: Guild): Collection<string, VoiceChannel> {
  return guild.channels.cache
    .filter((channel) => channel.type === 'GUILD_VOICE') as Collection<string, VoiceChannel>;
}

export function channelWithMostMembers(guild: Guild): VoiceChannel {
  const channels = voiceChannels(guild);

  return channels
    .map((channel) => {
      const userCount = channel.members
        .filter((member) => !member.user.bot)
        .size;

      return { userCount, channel };
    })
    .sort(({ userCount: A }, { userCount: B }) => B - A)[0].channel;
}
