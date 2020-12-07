"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SilenceStream = void 0;
const stream_1 = require("stream");
const silenceFrame = Buffer.from([0xF8, 0xFF, 0xFE]);
class SilenceStream extends stream_1.Readable {
    _read() {
        this.push(silenceFrame);
    }
}
exports.SilenceStream = SilenceStream;
