import {Message} from "./message";

export interface MessageReveal extends Message {
  isRevealed?: boolean;
}
