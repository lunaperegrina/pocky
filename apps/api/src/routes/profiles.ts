import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const profileRoutes = new Hono();

const createProfileSchema = z.object({
  displayName: z.string().min(1).max(50),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
  themeId: z.string().uuid().optional(),
});

const updateProfileSchema = createProfileSchema.partial();

profileRoutes.get('/:username', async (c) => {
  const username = c.req.param('username');

  // TODO: Implementar busca de perfil público
  return c.json({
    username,
    displayName: username,
    bio: 'Bio placeholder',
    avatarUrl: null,
    links: [],
    theme: {
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
    }
  });
});

profileRoutes.post('/', zValidator('json', createProfileSchema), async (c) => {
  const profileData = c.req.valid('json');

  // TODO: Implementar criação de perfil
  return c.json({
    message: 'Profile created successfully',
    profile: profileData
  }, 201);
});

profileRoutes.put('/:id', zValidator('json', updateProfileSchema), async (c) => {
  const id = c.req.param('id');
  const updateData = c.req.valid('json');

  // TODO: Implementar atualização de perfil
  return c.json({
    message: 'Profile updated successfully',
    profile: { id, ...updateData }
  });
});

profileRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');

  // TODO: Implementar deleção de perfil
  return c.json({ message: 'Profile deleted successfully' });
});

export { profileRoutes };