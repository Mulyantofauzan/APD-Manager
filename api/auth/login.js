const { corsMiddleware } = require('../middleware/cors');
const { generateToken } = require('../utils/jwt');
const { verifyPassword } = require('../utils/password');

// Hardcoded user untuk testing (dalam production, query dari database)
const USERS = [
  {
    id: 1,
    email: 'admin@apd.com',
    password_hash: 'f7e9e1c4a8d9c6b3e2a5f8d1b4c7e9a2c5f8e1b4:3d6f1e2a4c5b7e8f9a1d2c3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
    nama: 'Administrator',
    role: 'admin',
    is_active: true
  }
];

/**
 * Login API endpoint
 */
module.exports = async (req, res) => {
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
