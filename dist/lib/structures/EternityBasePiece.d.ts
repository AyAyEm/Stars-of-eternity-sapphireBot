import { Piece } from '@sapphire/framework';
import type { EternityClient } from '@lib';
export declare class EternityBasePiece extends Piece {
    get client(): EternityClient;
}
