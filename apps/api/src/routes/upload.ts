import { Hono } from 'hono';

const uploadRoutes = new Hono();

uploadRoutes.post('/avatar', async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body.file as File;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed' }, 400);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return c.json({ error: 'File size too large. Maximum size is 5MB' }, 400);
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Generate a unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2);
    const filename = `avatar_${timestamp}_${randomString}.${file.type.split('/')[1]}`;

    // For now, we'll use a placeholder service or local storage
    // In production, you'd upload to AWS S3, Cloudinary, or similar
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${filename}`;

    return c.json({
      message: 'Avatar uploaded successfully',
      avatarUrl,
      filename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload avatar' }, 500);
  }
});

export { uploadRoutes };