/**
 * Simple dev server untuk test Vercel API Routes locally
 * Run: node vercel-dev-server.js
 */
const http = require('http');
const url = require('url');
require('dotenv').config({ path: '.env.local' });

// Import API endpoints
const loginHandler = require('./api/auth/login');
const meHandler = require('./api/auth/me');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Parse body for POST requests
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        req.body = {};
      }
      handleRequest(pathname, req, res);
    });
  } else {
    handleRequest(pathname, req, res);
  }
});

async function handleRequest(pathname, req, res) {
  // Set content type
  res.setHeader('Content-Type', 'application/json');

  try {
    if (pathname === '/api/auth/login') {
      return await loginHandler(req, res);
    } else if (pathname === '/api/auth/me') {
      return await meHandler(req, res);
    } else if (pathname === '/health') {
      return res.writeHead(200).end(JSON.stringify({ status: 'ok' }));
    } else {
      return res.writeHead(404).end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.writeHead(500).end(JSON.stringify({ error: 'Internal server error' }));
  }
}

server.listen(PORT, () => {
  console.log(`\n✅ Dev server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST   http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET    http://localhost:${PORT}/api/auth/me`);
  console.log(`\n💡 Test credentials:`);
  console.log(`   Email: admin@apd.com`);
  console.log(`   Password: Admin123!\n`);
});
