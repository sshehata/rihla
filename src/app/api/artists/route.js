import { NextResponse } from 'next/server';
import artists from '../../data/artists';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get('id');

    if (artistId) {
        const artist = artists[artistId];
        if (artist) {
            return NextResponse.json(artist);
        } else {
            return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
        }
    } else {
        return NextResponse.json(artists);
    }
}
