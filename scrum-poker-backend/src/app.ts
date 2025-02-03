import express from 'express';
import { Server as WebSocketServer } from 'ws';
import { UserService } from './service/user-service';
import { RoomService } from './service/room-service';
import { WebsocketService } from './service/websocket-service';
import { Room } from './model/room';
import { User } from "./model/user";

const app = express();
const port: number = 5000;
const wsServer = new WebSocketServer({ noServer: true });
const websocketService: WebsocketService = new WebsocketService(wsServer);
const userService: UserService = new UserService();
const roomService: RoomService = new RoomService();

let room: Room = {
    users: [],
    isRevealed: false
};

wsServer.on('connection', socket => {
    console.log('Client connected on server')
    const socketId = Math.random().toString(36).substr(2, 9);
    websocketService.sendRoomToAllClients(room);
    console.log(room);


    socket.on('message', message => {

        const json = JSON.parse(message);

        if (json.tag === 'join') {
            const user: User = userService.createUser(socketId, json.name);
            room = roomService.addUserToRoom(room, user);
            websocketService.sendRoomToAllClients(room);
            console.log(json.name + ' joined the room');
        }

        if (json.tag === 'vote') {
            const user: User = roomService.getUserById(room, socketId);
            if (user) {
                user.vote = json.vote;
                websocketService.sendRoomToAllClients(room);
                console.log(user.name + ' voted ' + user.vote);
            }
        }

        if (json.tag == 'reveal') {
            room.isRevealed = true;
            websocketService.sendRoomToAllClients(room);
            console.log('Revealed', room)
        }

        if (json.tag == 'reset') {
            room.isRevealed = false;
            room.users.forEach(user => {
                user.vote = undefined;
            });
            websocketService.sendRoomToAllClients(room);
            console.log('Reset', room)
        }

    });

    socket.on('close', () => {
        const user: User = roomService.getUserById(room, socketId);
        if (user) {
            room = roomService.removeUserFromRoom(room, socketId);
            websocketService.sendRoomToAllClients(room);
            console.log(user.name + ' left the room');
        }
    });

});

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});
