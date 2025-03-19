import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const hackathons = await prisma.hackathon.findMany({
      where: {
        endDate: {
          gte: new Date(), // Only future or ongoing hackathons
        },
      },
      orderBy: {
        startDate: 'asc', // Earliest start date first
      },
    });

    return NextResponse.json(hackathons, { status: 200 });
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return NextResponse.json({ error: 'Failed to fetch hackathons' }, { status: 500 });
  }
}