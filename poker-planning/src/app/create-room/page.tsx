import CreateRoomForm from '../components/CreateRoomForm';

export default function CreateRoomPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Créer une room</h1>
            <CreateRoomForm />
        </div>
    );
}
