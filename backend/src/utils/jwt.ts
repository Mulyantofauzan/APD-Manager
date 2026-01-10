import { verify, sign } from 'hono/jwt';

export interface JWTPayload {
  id: number;
  email: string;
  nama: string;
  role: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-min-32-characters-long!!!';
const TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 7 days in seconds

/**
 * Generate JWT token
 */
export async function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  return await sign(
    {
      ...payload,
      iat: now,
      exp: now + TOKEN_EXPIRATION,
    },
    JWT_SECRET
  );
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const payload = await verify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}
