import {Message} from "./message";
import {Vote} from "./vote";

export interface MessageVote extends Message {
  name?: string;
  vote?: Vote;
}
