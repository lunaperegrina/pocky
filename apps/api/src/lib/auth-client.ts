import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://your-domain.com/api/auth'
    : 'http://localhost:3001/api/auth',
});