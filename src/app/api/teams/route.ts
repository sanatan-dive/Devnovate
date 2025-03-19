import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '../../../lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await authenticateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, description, hackathonId } = await req.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
    }

    // Create the team
    const team = await prisma.team.create({
      data: {
        name,
        description,
        owner: {
          connect: { id: user.id },
        },
        members: {
          connect: { id: user.id },
        },
        ...(hackathonId && {
          hackathon: {
            connect: { id: hackathonId },
          },
        }),
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        hackathon: true,
      },
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = await authenticateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { members: { some: { id: user.id } } },
          { ownerId: user.id },
        ],
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        hackathon: true,
      },
    });

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}