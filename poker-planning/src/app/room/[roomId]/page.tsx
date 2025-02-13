"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";

export default function RoomPage() {
    const { roomId } = useParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState<any>(null);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [joined, setJoined] = useState(false);
    const cards = [1, 2, 3, 5, 8, 13, 21];

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        newSocket.on("roomUpdated", (data) => setMessages(data));

        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);

    const joinRoom = () => {
        if (socket && username.trim() !== "") {
            socket.emit("joinRoom", { roomId, username });
            setJoined(true);
        }
    };

    const handleVote = (card: number) => {
        if (socket && roomId && username) {
            socket.emit("vote", { roomId, username, card });
            setSelectedCard(card);
        }
    };

    const handleReveal = () => socket?.emit("revealVotes", roomId);
    const handleReset = () => {
        socket?.emit("resetVotes", roomId);
        setSelectedCard(null);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">🃏 Scrum Poker - Room {roomId}</h1>

            {!joined ? (
                <div className="mb-4">
                    <input
                        className="border p-2 w-full mb-2"
                        placeholder="Entrez votre nom"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white p-2 w-full"
                        onClick={joinRoom}
                    >
                        Rejoindre la room 🚀
                    </button>
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Choisissez une carte :</h2>
                        <div className="flex gap-3">
                            {cards.map((card) => (
                                <button
                                    key={card}
                                    className={`p-4 text-xl border rounded ${selectedCard === card ? "bg-blue-600 text-white" : "bg-white"
                                        }`}
                                    onClick={() => handleVote(card)}
                                >
                                    {card}
                                </button>
                            ))}
                        </div>
                    </div>

                    {messages && (
                        <div className="mb-4">
                            <h3 className="font-bold">Votes:</h3>
                            {messages.users.map((user: string) => (
                                <div key={user}>
                                    {user} :{" "}
                                    {messages.revealed
                                        ? messages.votes[user] || "❓"
                                        : messages.votes[user]
                                            ? "🃏"
                                            : "❌"}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button className="bg-yellow-500 text-white px-4 py-2" onClick={handleReveal}>
                            👁️ Révéler
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2" onClick={handleReset}>
                            🔄 Réinitialiser
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
