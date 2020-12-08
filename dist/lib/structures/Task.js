"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const EternityBasePiece_1 = require("./EternityBasePiece");
class Task extends EternityBasePiece_1.EternityBasePiece {
    _interval;
    time;
    once;
    constructor(context, { name, ...options }) {
        super(context, { name: (name ?? context.name).toLowerCase(), ...options });
        this.time = options.time || 1000;
        this.enabled = options.enabled ?? true;
        this.once = options.once ?? false;
    }
    async onLoad() {
        this.client.ready.then(() => {
            this.run();
            if (!this.once) {
                this._interval = this.client.setInterval(() => {
                    this.run();
                }, this.time);
            }
        });
    }
    onUnload() {
        if (this._interval) {
            this.client.clearInterval(this._interval);
            this._interval = null;
        }
    }
}
exports.Task = Task;