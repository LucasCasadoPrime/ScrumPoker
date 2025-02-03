import { Vote} from "./vote";

export interface User {
    id?: string;
    name?: string;
    vote?: Vote;
}
