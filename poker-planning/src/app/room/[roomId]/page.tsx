'use client';

import Room from '../../components/Room';
import {useParams} from "next/navigation";

export default function RoomPage() {
    const { roomId } = useParams<{ roomId: string }>();
    const params = { roomId };

    if (!params?.roomId) {
        return <p className="text-center text-red-500">Room ID is missing!</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Room params={params} />
        </div>
    );
}
