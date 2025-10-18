import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { scraper } from '../lib/scraper';

const linkRoutes = new Hono();

const createLinkSchema = z.object({
  platform: z.enum(['linkedin', 'github', 'twitter', 'instagram', 'youtube', 'website', 'email']),
  username: z.string().min(1),
  url: z.string().url().optional(),
});

const updateLinkSchema = createLinkSchema.partial().extend({
  order: z.number().optional(),
});

linkRoutes.get('/profile/:profileId', async (c) => {
  const profileId = c.req.param('profileId');

  // TODO: Implementar busca de links por perfil
  return c.json({
    links: [
      {
        id: '1',
        platform: 'github',
        username: 'example',
        url: 'https://github.com/example',
        displayName: 'GitHub',
        icon: 'github',
        order: 1,
      }
    ]
  });
});

linkRoutes.post('/', zValidator('json', createLinkSchema), async (c) => {
  const linkData = c.req.valid('json');

  try {
    // Generate URL if not provided
    let url = linkData.url;
    if (!url) {
      switch (linkData.platform) {
        case 'github':
          url = `https://github.com/${linkData.username}`;
          break;
        case 'linkedin':
          url = `https://linkedin.com/in/${linkData.username}`;
          break;
        case 'twitter':
          url = `https://twitter.com/${linkData.username}`;
          break;
        case 'instagram':
          url = `https://instagram.com/${linkData.username}`;
          break;
        case 'youtube':
          url = `https://youtube.com/@${linkData.username}`;
          break;
        case 'email':
          url = `mailto:${linkData.username}`;
          break;
        default:
          url = linkData.username;
      }
    }

    // Generate icon
    const platformIcons = {
      github: '💻',
      linkedin: '💼',
      twitter: '🐦',
      instagram: '📸',
      youtube: '📺',
      website: '🌐',
      email: '✉️',
    };

    return c.json({
      message: 'Social link created successfully',
      link: {
        id: 'temp-id',
        ...linkData,
        url,
        displayName: linkData.platform.charAt(0).toUpperCase() + linkData.platform.slice(1),
        icon: platformIcons[linkData.platform as keyof typeof platformIcons],
        order: 1,
      }
    }, 201);
  } catch (error) {
    console.error('Error creating link:', error);
    return c.json({ error: 'Failed to create social link' }, 500);
  }
});

linkRoutes.put('/:id', zValidator('json', updateLinkSchema), async (c) => {
  const id = c.req.param('id');
  const updateData = c.req.valid('json');

  // TODO: Implementar atualização de link social
  return c.json({
    message: 'Social link updated successfully',
    link: { id, ...updateData }
  });
});

linkRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');

  // TODO: Implementar deleção de link social
  return c.json({ message: 'Social link deleted successfully' });
});

linkRoutes.post('/scrape', async (c) => {
  try {
    const { platform, username } = await c.req.json();

    if (!platform || !username) {
      return c.json({ error: 'Platform and username are required' }, 400);
    }

    // Validate platform
    const validPlatforms = ['linkedin', 'github', 'twitter', 'instagram', 'youtube', 'website', 'email'];
    if (!validPlatforms.includes(platform.toLowerCase())) {
      return c.json({ error: 'Invalid platform' }, 400);
    }

    // Scrape data from social media
    const scrapedData = await scraper.scrapeSocialMedia(platform, username);

    if (scrapedData.error) {
      return c.json({
        error: scrapedData.error,
        message: 'Could not scrape profile data. This might be due to privacy settings or an invalid username.'
      }, 400);
    }

    return c.json({
      message: 'Profile data scraped successfully',
      data: scrapedData
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return c.json({ error: 'Failed to scrape profile data' }, 500);
  }
});

export { linkRoutes };