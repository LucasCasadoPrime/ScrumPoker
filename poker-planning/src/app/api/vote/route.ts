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
