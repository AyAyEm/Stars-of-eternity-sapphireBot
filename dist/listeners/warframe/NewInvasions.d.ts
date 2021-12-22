import { Listener } from '@sapphire/framework';
import type { InvasionData } from "../../lib/types/Warframe";
export default class extends Listener {
    run(invasions: InvasionData[]): Promise<void>;
    private makeEmbeds;
}
