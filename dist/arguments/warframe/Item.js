"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const framework_1 = require("@sapphire/framework");
class Item extends framework_1.Argument {
    constructor(context) {
        super(context, { name: 'warframeItem' });
    }
    possibleItems = new Set([
        'vauban', 'vandal', 'wraith', 'skin', 'helmet',
        'nitain', 'mutalist', 'weapon', 'fieldron', 'detonite',
        'mutagen', 'aura', 'neuralsensors', 'orokincell', 'alloyplate',
        'circuits', 'controlmodule', 'ferrite', 'gallium', 'morphics',
        'nanospores', 'oxium', 'rubedo', 'salvage', 'plastids', 'polymerbundle',
        'argonCrystal', 'cryotic', 'tellurium', 'neurodes', 'nightmare', 'endo',
        'reactor', 'catalyst', 'forma', 'synthula', 'exilus', 'riven', 'kavatGene',
        'kubrowegg', 'traces', 'other', 'credits',
    ]);
    async run(argument) {
        const item = argument.toLowerCase();
        if (this.possibleItems.has(item))
            return this.ok(item);
        return this.error(argument, 'ArgumentInvalidItem', 'Argument passed cannot be resolved to a warframe item');
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map