'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRoomForm() {
    const [roomName, setRoomName] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Appel API pour créer une room
            const response = await fetch('/api/create-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomName, username }),
            });

            const data = await response.json();
            router.push(`/room/${data.roomId}/${roomName}?username=${username}`);
        } catch (error) {
            console.error('Erreur :', error);
            alert('Erreur lors de la création de la room');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Nom de la room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="px-4 py-2 border rounded w-full"
                required
            />
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-2 border rounded w-full"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                Créer
            </button>
        </form>
    );
}
