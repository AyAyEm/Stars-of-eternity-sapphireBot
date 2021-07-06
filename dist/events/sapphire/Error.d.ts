import { EternityEvent } from "../../lib";
import { Events } from '@sapphire/framework';
export default class extends EternityEvent<Events.Error> {
    run(err: Error): Promise<void>;
}
