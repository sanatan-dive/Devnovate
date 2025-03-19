import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '../../../../lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await authenticateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { teamId } = await req.json();

    // Validate required fields
    if (!teamId || typeof teamId !== 'string') {
      return NextResponse.json({ error: 'Team ID is required and must be a string' }, { status: 400 });
    }

    // Check if the team exists
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: true,
      },
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Check if the user is already a member of the team
    if (team.members.some(member => member.id === user.id)) {
      return NextResponse.json({ error: 'User is already a member of this team' }, { status: 400 });
    }

    // Add the user to the team
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        members: {
          connect: { id: user.id },
        },
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

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    console.error('Error joining team:', error);
    return NextResponse.json({ error: 'Failed to join team' }, { status: 500 });
  }
}