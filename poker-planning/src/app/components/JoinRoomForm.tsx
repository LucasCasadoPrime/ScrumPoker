'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinRoomForm() {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/room/${roomId}?userName=${userName}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="ID de la room"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="px-4 py-2 border rounded"
                required
            />
            <input
                type="text"
                placeholder="Votre nom"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="px-4 py-2 border rounded"
                required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Rejoindre
            </button>
        </form>
    );
}
