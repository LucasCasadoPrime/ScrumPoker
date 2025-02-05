'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import io from "socket.io-client";

export default function Room({ params }: { params: { roomId: string } }) {
    const searchParams = useSearchParams();
    const userName = searchParams.get('username') || "Invité";
    const [votes, setVotes] = useState<Record<string, string>>({});
    const [revealed, setRevealed] = useState(false);
    const [selectedVote, setSelectedVote] = useState<string | null>(null);

    const socket = io();

    useEffect(() => {
        socket.emit('join-room', { roomId: params.roomId, userName });

        socket.on('votes', (votes: Record<string, string>) => {
            setVotes(votes);
        });

        return () => {
            socket.disconnect();
        };
    }, [params.roomId, userName]);

    const handleVote = (vote: string) => {
        setSelectedVote(vote);
        socket.emit('vote', vote);
    };

    const revealVotes = () => {
        setRevealed(true);
    };

    const resetVotes = () => {
        setRevealed(false);
        setSelectedVote(null);
        socket.emit('reset-votes');
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold">Room {params.roomId}</h1>
            <p className="text-lg">Welcome, {userName}!</p>
            <div className="flex space-x-4">
                {['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?'].map((vote) => (
                    <motion.button
                        key={vote}
                        onClick={() => handleVote(vote)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`px-4 py-2 border rounded ${selectedVote === vote ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                        {vote}
                    </motion.button>
                ))}
            </div>
            <div className="flex space-x-4">
                <button onClick={revealVotes} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Reveal
                </button>
                <button onClick={resetVotes} className="bg-red-500 text-white px-4 py-2 rounded">
                    Reset
                </button>
            </div>
            <div className="flex space-x-4">
                {Object.entries(votes).map(([userName, vote]) => (
                    <div key={userName} className="flex items-center space-x-2">
                        <span className="font-bold">{userName}:</span>
                        <span>{revealed ? vote : '?'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
