import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Scrum Poker</h1>
            <div className="space-y-4">
                <Link href="/create-room">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Créer une room
                    </button>
                </Link>
                <Link href="/join-room">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                        Rejoindre une room
                    </button>
                </Link>
            </div>
        </div>
    );
}
