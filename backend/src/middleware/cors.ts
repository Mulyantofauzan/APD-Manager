import { Context, Next } from 'hono';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:8787',
  // Add your production domain here when deployed
  // 'https://yourdomain.com',
];

/**
 * CORS middleware
 */
export async function corsMiddleware(c: Context, next: Next) {
  const origin = c.req.header('Origin');

  // Check if origin is allowed
  const isAllowed = !origin || ALLOWED_ORIGINS.includes(origin);

  // Set CORS headers
  c.header('Access-Control-Allow-Origin', isAllowed ? origin || '*' : '');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.header('Access-Control-Max-Age', '3600');
  c.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    return c.text('', 200);
  }

  await next();
}
