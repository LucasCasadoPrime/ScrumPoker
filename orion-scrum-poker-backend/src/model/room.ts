import  { User } from "./user";

export interface Room {
    users?: User[];
    isRevealed?: boolean;
}
