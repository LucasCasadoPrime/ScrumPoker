import {VoteValueEnum} from "./enum/vote-value.enum";

export interface Vote {
    value?: VoteValueEnum;
    isVoted?: boolean;
}
