"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJoinChannel = void 0;
const voice_1 = require("@discordjs/voice");
const _utils_1 = require("../utils");
let executing = false;
function toJoinChannel(channel) {
    if (executing)
        return;
    executing = true;
    const { guild } = channel;
    const clientConnection = (0, voice_1.getVoiceConnection)(channel.guild.id);
    const mostMembersChannel = (0, _utils_1.channelWithMostMembers)(guild);
    if (mostMembersChannel.members.size <= 0) {
        (0, voice_1.getVoiceConnection)(guild.id).destroy();
        executing = false;
        return;
    }
    if (clientConnection?.state.status !== voice_1.VoiceConnectionStatus.Ready) {
        (0, voice_1.joinVoiceChannel)({
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
exports.toJoinChannel = toJoinChannel;
//# sourceMappingURL=ToJoinChannel.js.map