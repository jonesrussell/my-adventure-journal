import { NextResponse } from 'next/server';
import { fetchAdventureById, createAdventure } from '@/lib/adventureDbService';

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id: _id } = params;

  if (!_id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const adventure = await fetchAdventureById(_id);
    if (!adventure) {
      return NextResponse.json({ error: 'Adventure not found' }, { status: 404 });
    }
    return NextResponse.json(adventure);
  } catch (error) {
    console.error('Error fetching adventure:', error);
    return NextResponse.json({ error: 'Error fetching adventure' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id: _id } = params;
  const body = await request.json();
  const { name, location, description } = body;

  try {
    const updatedAdventure = await createAdventure({ name, location, description });
    return NextResponse.json(updatedAdventure);
  } catch (error) {
    console.error('Error updating adventure:', error);
    return NextResponse.json({ error: 'Error updating adventure' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id: _id } = params;

  try {
    await createAdventure({ name: '', location: '', description: '' });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error deleting adventure:', error);
    return NextResponse.json({ error: 'Error deleting adventure' }, { status: 500 });
  }
}

export async function getAdventureById(id: string): Promise<Adventure> {
  const adventure = await fetchAdventureById(id);

  if (!adventure) {
    throw new Error('Adventure not found');
  }

  return adventure;
} 