import { Task } from "../../lib/structures";
import { InvasionRepository } from "../../lib/typeorm/repositories";
export default class InvasionTracker extends Task {
    invasionUrl: string;
    get invasionRepo(): InvasionRepository;
    run(): Promise<void>;
}
