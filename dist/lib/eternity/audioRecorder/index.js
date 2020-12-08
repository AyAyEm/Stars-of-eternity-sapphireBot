"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioRecorder = void 0;
const audio_mixer_1 = __importDefault(require("audio-mixer"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const SilenceStream_1 = require("./SilenceStream");
const AudioDate_1 = require("./AudioDate");
fluent_ffmpeg_1.default.setFfmpegPath(require('@ffmpeg-installer/ffmpeg').path);
fluent_ffmpeg_1.default.setFfprobePath(require('@ffprobe-installer/ffprobe').path);
class AudioRecorder {
    voiceConnection;
    voiceInputOptions = {
        channels: 2,
        bitDepth: 16,
        sampleRate: 48000,
    };
    client;
    pcmMixer = new audio_mixer_1.default.Mixer(this.voiceInputOptions);
    channel;
    audioDateObject = AudioDate_1.audioDate();
    basePath = './audios/';
    audioPath = `${this.basePath}${this.audioDateObject.startDate}.ogg`;
    logPath = `${this.basePath}${this.audioDateObject.startDate}.txt`;
    isRecording = false;
    outputAudioStream;
    outputLogStream;
    removeListeners = [];
    constructor(voiceConnection) {
        this.voiceConnection = voiceConnection;
        this.channel = voiceConnection.channel;
        this.client = voiceConnection.client;
    }
    async assignVoiceConnection(member) {
        const { voiceConnection, pcmMixer } = this;
        const voiceStream = voiceConnection.receiver.createStream(member.user, { mode: 'pcm', end: 'manual' });
        const standaloneInput = new audio_mixer_1.default.Input({ ...this.voiceInputOptions, volume: 100 });
        pcmMixer.addInput(standaloneInput);
        voiceStream.pipe(standaloneInput);
    }
    async startRecording() {
        if (this.isRecording)
            await this.stopRecording();
        await this.channelLogger();
        this.isRecording = true;
        this.outputAudioStream = fs_extra_1.default.createWriteStream(this.audioPath);
        this.voiceConnection.play(new SilenceStream_1.SilenceStream(), { type: 'opus' });
        this.channel.members.array().forEach(async (member, i) => {
            const voiceStream = this.voiceConnection.receiver.createStream(member.user, { mode: 'pcm', end: 'manual' });
            if (i === 0) {
                const mixerInput = this.pcmMixer.input({ ...this.voiceInputOptions, volume: 100 });
                return voiceStream.pipe(mixerInput);
            }
            return this.assignVoiceConnection(member);
        });
        const memberJoinEventPath = `${this.channel.id}memberJoined`;
        const memberJoinEventHandler = async (member) => {
            if (member.guild.id !== this.voiceConnection.channel.guild.id)
                return;
            await this.assignVoiceConnection(member);
        };
        this.client.on(memberJoinEventPath, memberJoinEventHandler);
        this.removeListeners.push(() => (this.client.removeListener(memberJoinEventPath, memberJoinEventHandler)));
        fluent_ffmpeg_1.default(this.pcmMixer)
            .inputOptions(['-f s16le', '-acodec pcm_s16le', '-ac 2', '-ar 48000'])
            .audioQuality(24)
            .audioChannels(1)
            .audioCodec('opus')
            .format('opus')
            .on('error', this.client.console.error)
            .on('end', async () => {
            const { startToEndDate } = this.audioDateObject;
            await fs_extra_1.default.rename(this.audioPath, `${this.basePath}${startToEndDate()}.ogg`);
            await fs_extra_1.default.rename(this.logPath, `${this.basePath}${startToEndDate()}.txt`);
        })
            .pipe(this.outputAudioStream);
        this.voiceConnection.on('disconnect', this.stopRecording);
        this.removeListeners.push(() => this.client.removeListener('disconnect', this.stopRecording));
    }
    async stopRecording() {
        if (this.pcmMixer) {
            this.pcmMixer.emit('end');
            this.pcmMixer.close();
            this.pcmMixer.removeAllListeners();
            this.pcmMixer.destroy();
        }
        this.removeListeners.forEach((removeFn) => removeFn());
        this.outputLogStream?.end();
        this.isRecording = false;
    }
    async channelLogger() {
        const { channel } = this;
        this.outputLogStream = fs_extra_1.default.createWriteStream(this.logPath);
        const { outputLogStream } = this;
        const startString = [
            `Recording started at: ${this.audioDateObject.newDate()} `,
            `with ${this.channel.members.keyArray().length - 1} member, `,
            `in the channel: [${channel.name}]:[${channel.id}], `,
            `in the guild: [${channel.guild.name}]:[${channel.guild.id}]\n`,
            ' With the following members:\n',
        ].join();
        const startLog = channel.members.array().reduce((string, member) => {
            if (member.user.id === this.client.user?.id)
                return string;
            const newString = `${string}`
                + ` -NickName[${member.nickname}]:UserName:[${member.user.tag}]\n`;
            return newString;
        }, startString);
        outputLogStream.write(startLog);
        const eventJoinPath = `${channel.id}memberJoined`;
        const eventJoinHandler = async (member) => {
            const string = `[${this.audioDateObject.newDate()}]  :[Member joined]: `
                + `NickName[${member.nickname}]: `
                + `UserName[${member.user.tag}]:\n`;
            outputLogStream.write(string);
        };
        this.client.on(eventJoinPath, eventJoinHandler);
        this.removeListeners.push(() => (this.client.removeListener(eventJoinPath, eventJoinHandler)));
        const eventLeftPath = `${channel.id}memberLeft`;
        const eventLeftHandler = async (member) => {
            const string = `[${this.audioDateObject.newDate()}]  :[Member left]: `
                + `NickName[${member.nickname}]: `
                + `UserName[${member.user.tag}]\n`;
            outputLogStream.write(string);
        };
        this.client.on(`${channel.id}memberLeft`, eventLeftHandler);
        this.removeListeners.push(() => (this.client.removeListener(eventLeftPath, eventLeftHandler)));
    }
}
exports.AudioRecorder = AudioRecorder;
