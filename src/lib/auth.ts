import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

// Hash a password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Compare a plain password with a hashed password
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate a JWT token with user ID and isAdmin status
export function generateToken(userId: string, isAdmin: boolean): string {
  return jwt.sign(
    { 
      userId,
      isAdmin,
    },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
}

// Verify a JWT token and return its payload
export function verifyToken(token: string): { userId: string; isAdmin: boolean } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; isAdmin: boolean };
  } catch (error) {
    return null;
  }
}

// Authenticate a user based on the Authorization header
export async function authenticateUser(req: NextRequest): Promise<{ id: string; email: string; name: string; isAdmin: boolean } | null> {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return null;
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      },
    });
    
    if (!user) {
      return null;
    }
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
}

// Check if the authenticated user is an admin
export async function isAdmin(req: NextRequest): Promise<boolean> {
  const user = await authenticateUser(req);
  return user ? user.isAdmin : false;
}