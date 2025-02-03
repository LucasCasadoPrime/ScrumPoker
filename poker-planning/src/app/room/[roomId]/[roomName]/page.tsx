import Room from '../../../components/Room';

export default function RoomPage({ params }: { params: { roomId: string, roomName: string } }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Room Name: {params.roomName}</h1>
            <Room roomId={params.roomId} />
        </div>
    );
}
