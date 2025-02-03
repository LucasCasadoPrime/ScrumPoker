import { NextResponse } from 'next/server';

const rooms: Record<string, { roomName: string; votes: Record<string, string> }> = {};

export async function POST(request: Request) {
    const { roomId, userName, vote } = await request.json();
    rooms[roomId].votes[userName] = vote;
    return NextResponse.json({ votes: rooms[roomId].votes });
}
