import { WebSocketServer } from 'ws';
import {Room} from "../model/room";

export class WebsocketService {

    public wsServer: WebSocketServer;

    constructor(
        wsServer: WebSocketServer
    ) {
        this.wsServer = wsServer;
    }

    public sendRoomToAllClients(room: Room): void {
        this.wsServer.clients.forEach(client => {
            client.send(JSON.stringify(room));
        });
    }

    public sendRoomToAClient(room: Room, socketId: string): void {
        this.wsServer.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                if (client['_socket'].id === socketId) {
                    client.send(JSON.stringify(room));
                    console.log('sent room to client with socket id: ' + socketId);
                }
            }
        });
    }

}
