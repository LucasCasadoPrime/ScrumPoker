// types/socket.d.ts
import { Socket } from 'socket.io-client';

declare module 'socket.io-client' {
    interface Socket {
        on(event: 'players-update', callback: (players: string[]) => void): void;
        emit(event: 'join-room', data: { roomId: string; playerName: string }): void;
    }
}
