// pages/api/socket.ts
import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

let io: Server;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (!io) {
        io = new Server();
    }

    io.on('connection', (socket) => {
        console.log('Un joueur est connecté');

        socket.on('join-room', ({ roomId, playerName }: { roomId: string, playerName: string }) => {
            socket.join(roomId);
            io.to(roomId).emit('players-update', getPlayersInRoom(roomId));
        });

        // Gérer les autres événements ici (par exemple, démarrer le planning)
        socket.on('disconnect', () => {
            console.log('Un joueur s\'est déconnecté');
        });
    });

    res.end();
};

function getPlayersInRoom(roomId: string): string[] {
    // Exemple statique, vous pouvez l'intégrer à une base de données ou une structure de données plus complexe
    return ['Alice', 'Bob', 'Charlie']; // Liste des joueurs
}

export default handler;
