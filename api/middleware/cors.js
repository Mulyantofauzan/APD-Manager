/**
 * CORS middleware
 */
function setupCors(res) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://apd-manager.vercel.app',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
  ].filter(Boolean);

  const origin = res.req?.headers.origin || '*';

  res.setHeader('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : 'https://apd-manager.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Handle preflight requests
 */
function handleOptions(res) {
  setupCors(res);
  res.status(200).end();
}

/**
 * Middleware to setup CORS headers
 */
function corsMiddleware(req, res) {
  setupCors(res);

  if (req.method === 'OPTIONS') {
    handleOptions(res);
    return true;
  }
  return false;
}

module.exports = {
  corsMiddleware,
  setupCors
};
