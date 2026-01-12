import { extractTokenFromHeader, verifyToken } from '../utils/jwt.js';

/**
 * Authentication middleware - verify JWT token
 */
function authMiddleware(req) {
  const authHeader = req.headers.authorization;
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    throw new Error('No authentication token provided');
  }

  try {
    const user = verifyToken(token);
    return user;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Get user from request
 */
function getUser(req) {
  try {
    return authMiddleware(req);
  } catch (error) {
    return null;
  }
}

/**
 * Require specific role
 */
function requireRole(user, allowedRoles) {
  if (!user || !allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }
}

export {
  authMiddleware,
  getUser,
  requireRole
};
