import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { isAdmin } from '../../../../../lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userIsAdmin = await isAdmin(req);

  if (!userIsAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid hackathon ID' }, { status: 400 });
  }

  try {
    const hackathon = await prisma.hackathon.findUnique({
      where: { id },
      include: {
        teams: true,
      },
    });

    if (!hackathon) {
      return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    }

    return NextResponse.json(hackathon, { status: 200 });
  } catch (error) {
    console.error('Error fetching hackathon:', error);
    return NextResponse.json({ error: 'Failed to fetch hackathon' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userIsAdmin = await isAdmin(req);

  if (!userIsAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid hackathon ID' }, { status: 400 });
  }

  try {
    const { title, description, startDate, endDate, location, registrationUrl } = await req.json();

    const updatedHackathon = await prisma.hackathon.update({
      where: { id },
      data: {
        title,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        location,
        registrationUrl,
      },
    });

    return NextResponse.json(updatedHackathon, { status: 200 });
  } catch (error) {
    console.error('Error updating hackathon:', error);
    return NextResponse.json({ error: 'Failed to update hackathon' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const userIsAdmin = await isAdmin(req);

  if (!userIsAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid hackathon ID' }, { status: 400 });
  }

  try {
    await prisma.hackathon.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Hackathon deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting hackathon:', error);
    return NextResponse.json({ error: 'Failed to delete hackathon' }, { status: 500 });
  }
}