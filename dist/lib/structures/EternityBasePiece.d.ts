import { Piece } from '@sapphire/framework';
import type { EternityClient } from "..";
export declare class EternityBasePiece extends Piece {
    get client(): EternityClient;
}
