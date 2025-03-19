import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid hackathon ID' }, { status: 400 });
  }

  try {
    const hackathon = await prisma.hackathon.findUnique({
      where: { id },
      include: {
        teams: {
          include: {
            members: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!hackathon) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json(hackathon, { status: 200 });
  } catch (error) {
    console.error(`Error fetching hackathon ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch hackathon' }, { status: 500 });
  }
}