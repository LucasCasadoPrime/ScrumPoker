import { NextResponse } from 'next/server';

const rooms: Record<string, { roomName: string; votes: Record<string, string> }> = {};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');
    if (!roomId || !rooms[roomId]) {
        return NextResponse.json({ votes: {} });
    }
    return NextResponse.json({ votes: rooms[roomId].votes });
}


export async function POST(request: Request) {
    try {
        const { roomId, roomName, userName, vote } = await request.json();

        // Ensure room exists and initialize votes if necessary
        if (!rooms[roomId]) {
            rooms[roomId] = {roomName, votes: {} };  // Initialize room with an empty votes object
        }

        if (!rooms[roomId].votes) {
            rooms[roomId].votes = {};  // Initialize votes property if it's not already defined
        }

        // Store the vote
        rooms[roomId].votes[userName] = vote;

        // Return the updated votes for the room
        return NextResponse.json({ votes: rooms[roomId].votes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing the vote.' }, { status: 500 });
    }
}

