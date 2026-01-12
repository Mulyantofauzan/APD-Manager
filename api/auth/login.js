import { corsMiddleware } from '../middleware/cors.js';
import { generateToken } from '../utils/jwt.js';
import { verifyPassword } from '../utils/password.js';

// Hardcoded user untuk testing (dalam production, query dari database)
const USERS = [
  {
    id: 1,
    email: 'admin@apd.com',
    password_hash: 'f045ac5b82821dee5b0bc9418e825bddf34cb802ec85ede443626e6c2157d70b:34ed2e491408df0ae5bc64ec82b6f2fc37766d3d146b6884088e673387bd5a14b9b14978230db742c6810f56402014d00ac4b2fd10bb97ec69fadfab1e30b498',
    nama: 'Administrator',
    role: 'admin',
    is_active: true
  }
];

/**
 * Login API endpoint
 */
export default async (req, res) => {
  // Handle CORS preflight
  if (corsMiddleware(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password harus diisi' });
    }

    // Find user
    const user = USERS.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Akun Anda tidak aktif' });
    }

    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Generate token
    const authToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Return response
    return res.status(200).json({
      authToken,
      user: {
        id: user.id,
        email: user.email,
        nama: user.nama,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
