"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    const createRoom = () => {
        const roomId = crypto.randomUUID();
        router.push(`/room/${roomId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">🎴 Scrum Poker</h1>
            <button
                onClick={createRoom}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
                ➕ Créer une nouvelle Room
            </button>
        </div>
    );
}
