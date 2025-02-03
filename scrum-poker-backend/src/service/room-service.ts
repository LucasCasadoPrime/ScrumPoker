import { Room } from "../model/room";
import { User } from "../model/user";

export class RoomService {

    public addUserToRoom(room: Room, user: User): Room {
        room.users.push(user);
        return room;
    }

    public removeUserFromRoom(room: Room, socketId: string) {
        room.users = room.users.filter((user: User) => user.id !== socketId);
        return room;
    }

    public getUserById(room: Room, socketId: string): User {
        return room.users.find((user: User) => user.id === socketId);
    }
}
