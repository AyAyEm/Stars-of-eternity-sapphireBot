import { Awaitable, PieceContext } from '@sapphire/framework';
import { AliasPieceOptions } from '@sapphire/pieces';
import { EternityBasePiece } from './EternityBasePiece';
export interface TaskOptions extends AliasPieceOptions {
    time?: number;
    once?: boolean;
}
export declare abstract class Task extends EternityBasePiece {
    private _interval;
    time: number;
    once: boolean;
    abstract run(...args: readonly unknown[]): Awaitable<void>;
    constructor(context: PieceContext, { name, ...options }: TaskOptions);
    onLoad(): Promise<void>;
    onUnload(): void;
}
