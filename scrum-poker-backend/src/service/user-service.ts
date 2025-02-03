import {User} from "../model/user";

export class UserService {

    public createUser(socketId: string, name: string): User {
        return {
            id: socketId,
            name: name,
            vote: undefined
        }
    }



}
