import { getVoiceConnection, VoiceConnectionStatus, joinVoiceChannel } from '@discordjs/voice';

import type { VoiceChannel } from 'discord.js';

import { channelWithMostMembers } from '#utils';

let executing = false;
export function toJoinChannel(channel: VoiceChannel) {
  if (executing) return;
  executing = true;

  const { guild } = channel;

  const clientConnection = getVoiceConnection(channel.guild.id);
  const mostMembersChannel = channelWithMostMembers(guild);
  if (mostMembersChannel.members.size <= 0) {
    getVoiceConnection(guild.id).destroy();
    executing = false;
    return;
  }

  if (clientConnection?.state.status !== VoiceConnectionStatus.Ready) {
    joinVoiceChannel({ 
      channelId: mostMembersChannel.id,
      guildId: guild.id, 
      adapterCreator: channel.guild.voiceAdapterCreator, 
    });
    executing = false;
    return;
  }

  // if (mostMembersChannel.id === clientConnection.state.id) {
  //   executing = false;
  //   return;
  // }

  // botVoiceConnection?.emit('endRecording');
  // channelWithMostUsers.join();
  executing = false;
}
