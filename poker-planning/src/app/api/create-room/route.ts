import { NextResponse } from 'next/server';

// Simule une base de données en mémoire
const rooms: Record<string, { players: string[]; votes: Record<string, string> }> = {};

export async function POST(request: Request) {
    try {
        // Vérifie que le corps de la requête est bien un JSON valide
        const { username } = await request.json();

        // Génère un ID unique pour la room
        const roomId = Math.random().toString(36).substring(7);

        // Crée une nouvelle room dans la "base de données"
        rooms[roomId] = { players: [username], votes: {} };

        // Retourne l'ID de la room créée
        return NextResponse.json({ roomId });
    } catch (error) {
        console.error('Erreur lors de la création de la room:', error);

        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}
