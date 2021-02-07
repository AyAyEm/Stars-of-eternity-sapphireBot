import { Piece } from '@sapphire/framework';

import type { EternityClient } from '@lib';

export class EternityBasePiece extends Piece {
  get client(): EternityClient {
    return super.context.client as EternityClient;
  }
}
