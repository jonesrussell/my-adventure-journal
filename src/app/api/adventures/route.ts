import { NextResponse } from 'next/server';
import { Adventure, PrismaClient } from '@prisma/client';
import { AdventureData } from '@/types/Adventure';

const prisma = new PrismaClient();

export async function GET(): Promise<NextResponse> {
  try {
    const adventures = await prisma.adventure.findMany();
    return NextResponse.json(adventures);
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    console.error('Error fetching adventures:', typedError);
    console.error('Error details:', typedError.stack);
    const errorDetails = {
      message: typedError.message || 'Unknown error',
      stack: typedError.stack || 'No stack trace available',
    };
    return NextResponse.json({ error: 'Failed to fetch adventures', details: errorDetails }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const { name, location, description } = body;

  const _data: AdventureData = { name, location, description };

  try {
    const newAdventure = await prisma.adventure.create({
      data: _data,
    });
    return NextResponse.json(newAdventure, { status: 201 });
  } catch (error) {
    console.error('Error creating adventure:', error);
    return NextResponse.json({ error: 'Failed to create adventure' }, { status: 500 });
  }
}

export async function createAdventure(data: AdventureData): Promise<Adventure> {
  const _data: AdventureData = {
    name: data.name,
    location: data.location,
    description: data.description,
  };

  try {
    const newAdventure = await prisma.adventure.create({
      data: _data,
    });
    return newAdventure;  
  } catch (error) {
    console.error('Error creating adventure:', error);
    throw error;
  }
}
