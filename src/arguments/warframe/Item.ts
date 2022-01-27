import { Argument } from '@sapphire/framework';

import type { PieceContext } from '@sapphire/framework';

export class Item extends Argument {
  public constructor(context: PieceContext) {
    super(context, { name: 'warframeItem' });
  }

  public readonly possibleItems = new Set([
    'vauban', 'vandal', 'wraith', 'skin', 'helmet',
    'nitain', 'mutalist', 'weapon', 'fieldron', 'detonite',
    'mutagen', 'aura', 'neuralsensors', 'orokincell', 'alloyplate',
    'circuits', 'controlmodule', 'ferrite', 'gallium', 'morphics',
    'nanospores', 'oxium', 'rubedo', 'salvage', 'plastids', 'polymerbundle',
    'argonCrystal', 'cryotic', 'tellurium', 'neurodes', 'nightmare', 'endo',
    'reactor', 'catalyst', 'forma', 'synthula', 'exilus', 'riven', 'kavatGene',
    'kubrowegg', 'traces', 'other', 'credits',
  ]);

  public async run(parameter: string) {
    const item = parameter.toLowerCase();
    if (this.possibleItems.has(item)) return this.ok(item);
    return this.error({
      parameter,
      identifier: 'ArgumentInvalidItem',
      message: 'Argument passed cannot be resolved to a warframe item',
    });
  }
}
