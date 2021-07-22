import { Task } from "../../lib/structures";
import { FissureRepository } from "../../lib/typeorm/repositories";
export default class extends Task {
    fissuresUrl: string;
    get fissureRepo(): FissureRepository;
    run(): Promise<void>;
}
