// app/room/[roomId]/page.tsx
'use client';  // nécessaire pour l'utilisation de hooks dans les pages de l'app router

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface RoomProps {
    params: { roomId: string };
}

const Room: React.FC<RoomProps> = ({ params }) => {
    const { roomId } = params;
    const [players, setPlayers] = useState<string[]>([]);
    const [playerName, setPlayerName] = useState<string>('');
    let socket: Socket;

    useEffect(() => {
        // Connexion au serveur WebSocket
        socket = io();

        // Ecouter les événements de mise à jour des joueurs
        socket.on('players-update', (newPlayers: string[]) => {
            setPlayers(newPlayers);
        });

        // Nettoyer la connexion lors du démontage du composant
        return () => {
            socket.disconnect();
        };
    }, []);

    const joinRoom = () => {
        if (playerName) {
            socket.emit('join-room', { roomId, playerName });
        }
    };

    return (
        <div>
            <h1>Salle {roomId}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Votre nom"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button onClick={joinRoom}>Rejoindre la salle</button>
            </div>
            <h2>Joueurs dans la salle :</h2>
            <ul>
                {players.map((player) => (
                    <li key={player}>{player}</li>
                ))}
            </ul>
        </div>
    );
};

export default Room;
