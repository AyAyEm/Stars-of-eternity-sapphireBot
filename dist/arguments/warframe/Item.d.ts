import { Argument } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/framework';
export declare class Item extends Argument {
    constructor(context: PieceContext);
    readonly possibleItems: Set<string>;
    run(argument: string): Promise<import("@sapphire/framework").Result<unknown, import("@sapphire/framework").UserError>>;
}
