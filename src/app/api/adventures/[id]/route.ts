import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { fetchAdventureById } from '@/lib/adventureDbService';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const adventure = await fetchAdventureById(id);
    if (!adventure) {
      return NextResponse.json({ error: 'Adventure not found' }, { status: 404 });
    }
    return NextResponse.json(adventure);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching adventure' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const body = await request.json();
  const { name, location } = body;

  try {
    const updatedAdventure = await prisma.adventure.update({
      where: { id },
      data: { name, location },
    });

    return NextResponse.json(updatedAdventure);
  } catch (error) {
    console.error('Error updating adventure:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    await prisma.adventure.delete({
      where: { id },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error deleting adventure:', error);
    return NextResponse.error();
  }
} 