import { Task } from "../../lib/structures";
export default class extends Task {
    fissuresUrl: string;
    run(): Promise<void>;
}
