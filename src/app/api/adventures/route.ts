import { NextResponse } from 'next/server';
import { fetchAdventures, createAdventure } from '@/lib/adventureDbService';

export async function GET(): Promise<NextResponse> {
  try {
    const adventures = await fetchAdventures();
    return NextResponse.json(adventures);
  } catch (error) {
    console.error('Error fetching adventures:', error);
    return NextResponse.json({ error: 'Failed to fetch adventures' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const { name, location, description } = body;

  const adventureData = { name, location, description };

  try {
    const newAdventure = await createAdventure(adventureData);
    return NextResponse.json(newAdventure, { status: 201 });
  } catch (error) {
    console.error('Error creating adventure:', error);
    return NextResponse.json({ error: 'Failed to create adventure' }, { status: 500 });
  }
}
