import { Hono } from 'hono';
import { Context } from 'hono';
import { generateToken, verifyToken } from '../utils/jwt';
import { hashPassword, verifyPassword, validatePasswordStrength } from '../utils/password';
import { authMiddleware, getUser } from '../middleware/auth';

const router = new Hono();

/**
 * POST /auth/login
 * Login with email and password
 */
router.post('/login', async (c: Context) => {
  try {
    const { email, password } = await c.req.json<{ email: string; password: string }>();

    // Validate input
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const db = c.env.DB as D1Database;

    // Get user from database
    const user = await db
      .prepare('SELECT id, email, password_hash, nama, role, is_active FROM users WHERE email = ?')
      .bind(email)
      .first<{
        id: number;
        email: string;
        password_hash: string;
        nama: string;
        role: string;
        is_active: number;
      }>();

    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    // Check if user is active
    if (!user.is_active) {
      return c.json({ error: 'User account is inactive' }, 403);
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    // Generate JWT token
    const token = await generateToken({
      id: user.id,
      email: user.email,
      nama: user.nama,
      role: user.role,
    });

    return c.json({
      authToken: token,
      user: {
        id: user.id,
        email: user.email,
        nama: user.nama,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * GET /auth/me
 * Get current user info
 */
router.get('/me', authMiddleware, async (c: Context) => {
  try {
    const user = getUser(c);

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    return c.json({
      id: user.id,
      email: user.email,
      nama: user.nama,
      role: user.role,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * POST /auth/register (Admin only - for future use)
 * Create new user account
 */
router.post('/register', async (c: Context) => {
  try {
    const { email, password, nama, role } = await c.req.json<{
      email: string;
      password: string;
      nama: string;
      role: string;
    }>();

    // Validate input
    if (!email || !password || !nama || !role) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return c.json({ error: passwordValidation.errors }, 400);
    }

    // Validate role
    const validRoles = ['admin', 'management', 'user'];
    if (!validRoles.includes(role)) {
      return c.json({ error: 'Invalid role' }, 400);
    }

    const db = c.env.DB as D1Database;

    // Check if email already exists
    const existingUser = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind(email)
      .first();

    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 409);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Insert new user
    const result = await db
      .prepare(
        'INSERT INTO users (email, password_hash, nama, role, is_active) VALUES (?, ?, ?, ?, 1)'
      )
      .bind(email, passwordHash, nama, role)
      .run();

    if (!result.success) {
      return c.json({ error: 'Failed to create user' }, 500);
    }

    return c.json({
      message: 'User created successfully',
      user: {
        email,
        nama,
        role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * POST /auth/logout
 * Logout (optional - mainly for frontend to clear localStorage)
 */
router.post('/logout', authMiddleware, async (c: Context) => {
  // Token is already in localStorage on frontend
  // This endpoint is optional and can be used for server-side cleanup (e.g., token blacklist)

  return c.json({ message: 'Logged out successfully' });
});

export default router;
