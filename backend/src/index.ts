import { Hono } from 'hono';
import { cors } from 'hono/cors';
import authRouter from './routes/auth';

// Type definitions for Cloudflare environment
interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  ENVIRONMENT: string;
}

// Create Hono app
const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use('*', cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    environment: c.env.ENVIRONMENT || 'development',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.route('/api/auth', authRouter);

// API routes placeholder (to be implemented)
app.get('/api/apd', (c) => {
  return c.json({ message: 'APD routes coming soon' });
});

app.get('/api/karyawan', (c) => {
  return c.json({ message: 'Karyawan routes coming soon' });
});

app.get('/api/transaksi', (c) => {
  return c.json({ message: 'Transaksi routes coming soon' });
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
