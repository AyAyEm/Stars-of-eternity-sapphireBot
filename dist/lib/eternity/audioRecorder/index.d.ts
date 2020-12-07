/// <reference types="node" />
import AudioMixer from 'audio-mixer';
import type { VoiceConnection, VoiceChannel, GuildMember } from 'discord.js';
import type { WriteStream } from 'fs';
import type { EternityClient } from '@lib';
export declare class AudioRecorder {
    voiceConnection: VoiceConnection;
    protected voiceInputOptions: {
        channels: number;
        bitDepth: number;
        sampleRate: number;
    };
    client: EternityClient;
    protected pcmMixer: AudioMixer.Mixer;
    protected channel: VoiceChannel;
    audioDateObject: {
        startToEndDate: () => string;
        startDate: string;
        newDate: () => string;
    };
    readonly basePath = "./audios/";
    readonly audioPath: string;
    readonly logPath: string;
    protected isRecording: boolean;
    protected outputAudioStream?: WriteStream;
    protected outputLogStream?: WriteStream;
    protected removeListeners: Array<() => void>;
    constructor(voiceConnection: VoiceConnection);
    assignVoiceConnection(member: GuildMember): Promise<void>;
    startRecording(): Promise<void>;
    stopRecording(): Promise<void>;
    channelLogger(): Promise<void>;
}
