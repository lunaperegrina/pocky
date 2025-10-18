import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { authRoutes } from './routes/auth';
import { profileRoutes } from './routes/profiles';
import { linkRoutes } from './routes/links';
import { analyticsRoutes } from './routes/analytics';
import { adminRoutes } from './routes/admin';
import { uploadRoutes } from './routes/upload';

const app = new Hono();

// CORS configuration
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use('*', logger());

// Better Auth handler
app.all('/api/auth/*', authRoutes);

// API routes
app.route('/api/profiles', profileRoutes);
app.route('/api/links', linkRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api/admin', adminRoutes);
app.route('/api/upload', uploadRoutes);

app.get('/', (c) => {
  return c.json({ message: 'Pocky API v1.0.0' });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (c) => {
  return c.json({
    message: 'Pocky API v1.0.0',
    endpoints: {
      auth: '/api/auth',
      profiles: '/api/profiles',
      links: '/api/links',
      analytics: '/api/analytics',
      admin: '/api/admin',
      upload: '/api/upload',
    }
  });
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json(
    {
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    },
    500
  );
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

const port = process.env.PORT || 3001;
console.log(`🚀 Pocky API is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};