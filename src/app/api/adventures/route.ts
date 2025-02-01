import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
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

export async function POST(request: Request) {
  const body = await request.json();
  const { name, location, description } = body;

  try {
    const newAdventure = await prisma.adventure.create({
      data: { name, location, description },
    });
    return NextResponse.json(newAdventure, { status: 201 });
  } catch (error) {
    console.error('Error creating adventure:', error);
    return NextResponse.error();
  }
} 