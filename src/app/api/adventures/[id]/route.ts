import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Adventure } from '@/types/Adventure';
import { fetchAdventureById } from '@/lib/adventureDbService';

const prisma = new PrismaClient();

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
    const updatedAdventure = await prisma.adventure.update({
      where: { id: _id },
      data: { name, location, description },
    });

    return NextResponse.json(updatedAdventure);
  } catch (error) {
    console.error('Error updating adventure:', error);
    return NextResponse.json({ error: 'Error updating adventure' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id: _id } = params;

  try {
    await prisma.adventure.delete({
      where: { id: _id },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error deleting adventure:', error);
    return NextResponse.json({ error: 'Error deleting adventure' }, { status: 500 });
  }
}

export async function getAdventureById(id: string): Promise<Adventure> {
  const adventure = await prisma.adventure.findUnique({
    where: { id },
  });

  if (!adventure) {
    throw new Error('Adventure not found');
  }

  return adventure;
} 