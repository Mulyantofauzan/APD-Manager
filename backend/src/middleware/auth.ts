import { Context, Next } from 'hono';
import { extractTokenFromHeader, verifyToken, JWTPayload } from '../utils/jwt';

/**
 * Middleware to verify JWT token
 */
export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }

  // Store user info in context for use in route handlers
  c.set('user', payload);

  await next();
}

/**
 * Middleware to verify specific role
 */
export function requireRole(...roles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as JWTPayload | undefined;

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    if (!roles.includes(user.role)) {
      return c.json({ error: 'Forbidden - Insufficient permissions' }, 403);
    }

    await next();
  };
}

/**
 * Middleware to extract user from context
 */
export function getUser(c: Context): JWTPayload | undefined {
  return c.get('user') as JWTPayload | undefined;
}
