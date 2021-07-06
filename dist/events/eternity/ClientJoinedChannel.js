"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
const eternity_1 = require("../../lib/eternity");
let default_1 = class extends _lib_1.EternityEvent {
    recorders = new Map();
    async run(_channel, state) {
        if (this.recorders.has(state.guild.id)) {
            const oldAudioRecorder = this.recorders.get(state.guild.id);
            await oldAudioRecorder.stopRecording();
            this.recorders.delete(state.guild.id);
        }
        const recorder = new eternity_1.AudioRecorder(state.connection);
        this.recorders.set(state.guild.id, recorder);
        recorder.startRecording();
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: 'clientJoinedChannel' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=ClientJoinedChannel.js.map