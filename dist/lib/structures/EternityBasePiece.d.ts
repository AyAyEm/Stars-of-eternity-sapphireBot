import { BasePiece } from '@sapphire/framework';
import type { EternityClient } from '@lib';
export declare class EternityBasePiece extends BasePiece {
    get client(): EternityClient;
}
