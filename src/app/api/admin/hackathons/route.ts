import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { isAdmin } from '../../../../lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const userIsAdmin = await isAdmin(req);

  if (!userIsAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
  }

  try {
    const { title, description, startDate, endDate, location, registrationUrl } = await req.json();

    // Validate required fields
    if (!title || !description || !startDate || !endDate || !registrationUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const hackathon = await prisma.hackathon.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        registrationUrl,
      },
    });

    return NextResponse.json(hackathon, { status: 201 });
  } catch (error) {
    console.error('Error creating hackathon:', error);
    return NextResponse.json({ error: 'Failed to create hackathon' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userIsAdmin = await isAdmin(req);

  if (!userIsAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
  }

  try {
    const hackathons = await prisma.hackathon.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });

    return NextResponse.json(hackathons, { status: 200 });
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return NextResponse.json({ error: 'Failed to fetch hackathons' }, { status: 500 });
  }
}