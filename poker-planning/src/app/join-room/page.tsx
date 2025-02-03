import JoinRoomForm from "../components/JoinRoomForm";

export default function JoinRoomPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Rejoindre une room</h1>
            <JoinRoomForm />
        </div>
    );
}
