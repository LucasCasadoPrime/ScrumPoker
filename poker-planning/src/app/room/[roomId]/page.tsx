"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";

export default function RoomPage() {
    const { roomId } = useParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState<{ users: string[]; votes: Record<string, number>; revealed: boolean } | null>(null);
    const [selectedCard, setSelectedCard] = useState<number | string | null>(null);
    const [joined, setJoined] = useState(false);
    const cards = [1, 2, 3, 5, 8, "☕️", "❓"];

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

    useEffect(() => {
        const newSocket = io(socketUrl, {
            transports: ["websocket"]
        });

        newSocket.on("roomUpdated", (data) => {
            console.log("Données reçues :", data);
            setMessages(data);
        });

        setSocket(newSocket);

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

    const handleVote = (card: number | string) => {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900">
            {/* Header */}
            <header className="bg-blue-600 text-white p-6 text-left text-4xl font-extrabold shadow-lg">
                <span className="text-gray-300 text-5xl">Orion</span> ScrumPoker
            </header>

            <div className="max-w-2xl mx-auto mt-12 p-8 border border-blue-200 rounded-2xl shadow-xl bg-white">
                {!joined ? (
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Rejoindre la Room</h2>
                        <input
                            className="border border-blue-300 p-3 w-full mb-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Entrez votre nom"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all"
                            onClick={joinRoom}
                        >
                            🚀 Rejoindre la room
                        </button>
                    </div>
                ) : (
                    <div>
                        {/* Card selection */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">Choisissez une carte :</h2>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {cards.map((card) => (
                                    <button
                                        key={card}
                                        className={`w-16 h-16 flex items-center justify-center text-2xl font-bold border rounded-2xl shadow-md transition-all ${selectedCard === card ? "bg-blue-600 text-white scale-110" : "bg-white hover:bg-blue-100"
                                            }`}
                                        onClick={() => handleVote(card)}
                                    >
                                        {card}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* User list and votes */}
                        {messages && messages.users && (
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3">Participants :</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {messages.users.map((user: string) => {
                                        const hasVoted = messages.votes[user] !== undefined;
                                        return (
                                            <div
                                                key={user}
                                                className="flex items-center justify-between p-4 border rounded-xl shadow bg-blue-50"
                                            >
                                                <span className="font-medium text-lg">{user}</span>
                                                {hasVoted ? (
                                                    messages.revealed ? (
                                                        <span className="text-xl font-bold">{messages.votes[user]}</span>
                                                    ) : (
                                                        <span className="text-green-600 text-xl">✔️</span>
                                                    )
                                                ) : (
                                                    <span className="text-red-500 text-xl">⏳</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-6 justify-center">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md" onClick={handleReveal}>
                                👁️ Révéler
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md" onClick={handleReset}>
                                🔄 Réinitialiser
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}
