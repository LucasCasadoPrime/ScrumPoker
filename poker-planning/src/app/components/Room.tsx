'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Room({ params }: { params: { roomId: string, roomName: string } }) {
    const searchParams = useSearchParams();
    const userName = searchParams.get('username');
    const [votes, setVotes] = useState<Record<string, string>>({});
    const [revealed, setRevealed] = useState(false);

    const handleVote = async (vote: string) => {
        const response = await fetch(`/api/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId: params.roomId, roomName: params.roomName, userName, vote }),
        });
        const data = await response.json();
        setVotes(data.votes);
    };

    const resetVotes = () => {
        setRevealed(false);
        setVotes({});
    };

    useEffect(() => {
        const fetchVotes = async () => {
            const response = await fetch(`/api/votes?roomId=${params.roomId}`);
            const data = await response.json();
            setVotes(data.votes);
        };

        fetchVotes().then();
    }, [revealed]);

    return (
        <div className="space-y-4">
            <p>Bienvenue, {userName}!</p>
            <div className="flex space-x-4">
                {['1', '2', '3', '5', '8', '13'].map((vote) => (
                    <button
                        key={vote}
                        onClick={() => handleVote(vote)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {vote}
                    </button>
                ))}
            </div>
            <button
                onClick={() => setRevealed(true)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                Révéler les votes
            </button>
            {revealed && (
                <div>
                    <h2 className="text-xl font-bold">Votes:</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(votes).map(([user, vote]) => (
                            <div key={user} className="p-4 bg-gray-200 rounded shadow">
                                <p className="font-bold">{user}</p>
                                <p className="text-lg">{vote}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={resetVotes}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}
