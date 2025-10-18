import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { auth } from '../lib/auth';
import type { Auth } from 'better-auth/types';

const authRoutes = new Hono<{
  Variables: {
    authUser: Auth['user'];
  };
}>();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Middleware para autenticação
authRoutes.use('/*', async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.header(),
  });

  if (session?.user) {
    c.set('authUser', session.user);
  }

  await next();
});

authRoutes.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, username } = c.req.valid('json');

  try {
    // Verificar se o username já existe
    const existingUser = await auth.api.getUser({
      query: { username },
    });

    if (existingUser) {
      return c.json({ error: 'Username already exists' }, 400);
    }

    // Criar usuário
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username,
      },
    });

    return c.json({
      message: 'User registered successfully',
      user: {
        id: user.user?.id,
        email: user.user?.email,
        username: user.user?.name,
      }
    }, 201);
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Registration failed' }, 400);
  }
});

authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  try {
    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!session) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Set the session cookie
    const sessionCookie = session.headers.get('set-cookie');
    if (sessionCookie) {
      c.header('set-cookie', sessionCookie);
    }

    return c.json({
      message: 'Login successful',
      user: {
        id: session.user?.id,
        email: session.user?.email,
        username: session.user?.name,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 401);
  }
});

authRoutes.post('/logout', async (c) => {
  try {
    await auth.api.signOut({
      headers: c.req.header(),
    });

    return c.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return c.json({ error: 'Logout failed' }, 500);
  }
});

authRoutes.get('/me', async (c) => {
  const authUser = c.get('authUser');

  if (!authUser) {
    return c.json({ error: 'Not authenticated' }, 401);
  }

  return c.json({
    user: {
      id: authUser.id,
      email: authUser.email,
      username: authUser.name,
      emailVerified: authUser.emailVerified,
      createdAt: authUser.createdAt,
    }
  });
});

// Handler para o Better Auth
authRoutes.all('/*', (c) => {
  return auth.handler(c.req.raw);
});

export { authRoutes };