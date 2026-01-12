const { corsMiddleware } = require('../middleware/cors');
const { authMiddleware } = require('../middleware/auth');

/**
 * Get current user info
 */
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (corsMiddleware(req, res)) {
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = authMiddleware(req);

    return res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
