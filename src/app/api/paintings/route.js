import { NextResponse } from 'next/server';
import paintings from '../../data/paintings';

export async function GET() {
    return NextResponse.json(paintings);
}
