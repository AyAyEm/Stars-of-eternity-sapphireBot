import { Task } from "../../lib/structures";
export default class InvasionTracker extends Task {
    invasionUrl: string;
    run(): Promise<void>;
}
