import { Listener } from '@sapphire/framework';
import type { Fissure as WarframeFissure } from "../../lib/types/Warframe";
export default class extends Listener {
    run(fissures: WarframeFissure[]): Promise<void>;
}
