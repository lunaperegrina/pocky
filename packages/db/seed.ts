import { db } from './src/index';
import { users, profiles, themes, socialLinks } from './src/schema';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create default themes
    const defaultThemes = [
      {
        name: 'Clássico',
        primaryColor: '#000000',
        backgroundColor: '#ffffff',
        cardStyle: 'rounded',
        fontFamily: 'inter',
        isDefault: true,
      },
      {
        name: 'Escuro',
        primaryColor: '#ffffff',
        backgroundColor: '#000000',
        cardStyle: 'rounded',
        fontFamily: 'inter',
        isDefault: false,
      },
      {
        name: 'Azul',
        primaryColor: '#3b82f6',
        backgroundColor: '#eff6ff',
        cardStyle: 'rounded',
        fontFamily: 'inter',
        isDefault: false,
      },
    ];

    console.log('📨 Inserting default themes...');
    const insertedThemes = await db.insert(themes).values(defaultThemes).returning();

    // Create demo user
    console.log('👤 Creating demo user...');
    const demoUser = await db.insert(users).values({
      email: 'demo@pocky.me',
      passwordHash: '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ', // demo123
      username: 'demo',
      status: 'active',
      emailVerified: true,
    }).returning();

    // Create demo profile
    console.log('📝 Creating demo profile...');
    const demoProfile = await db.insert(profiles).values({
      userId: demoUser[0].id,
      displayName: 'Demo User',
      bio: 'Este é um perfil de demonstração do Pocky. Uma plataforma para criar perfis pessoais no estilo bento.',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      themeId: insertedThemes[0].id,
      isPublic: true,
    }).returning();

    // Create demo social links
    console.log('🔗 Creating demo social links...');
    const demoLinks = [
      {
        profileId: demoProfile[0].id,
        platform: 'github' as const,
        username: 'demo',
        url: 'https://github.com/demo',
        displayName: 'GitHub',
        icon: '💻',
        order: 1,
      },
      {
        profileId: demoProfile[0].id,
        platform: 'linkedin' as const,
        username: 'demo-user',
        url: 'https://linkedin.com/in/demo-user',
        displayName: 'LinkedIn',
        icon: '💼',
        order: 2,
      },
      {
        profileId: demoProfile[0].id,
        platform: 'twitter' as const,
        username: '@demo_user',
        url: 'https://twitter.com/demo_user',
        displayName: 'Twitter',
        icon: '🐦',
        order: 3,
      },
      {
        profileId: demoProfile[0].id,
        platform: 'instagram' as const,
        username: '@demo.user',
        url: 'https://instagram.com/demo.user',
        displayName: 'Instagram',
        icon: '📸',
        order: 4,
      },
    ];

    await db.insert(socialLinks).values(demoLinks);

    console.log('✅ Database seeding completed successfully!');
    console.log('');
    console.log('📊 Demo data created:');
    console.log(`   - Themes: ${insertedThemes.length}`);
    console.log(`   - User: demo@pocky.me (username: demo)`);
    console.log(`   - Profile: pocky.me/demo`);
    console.log(`   - Social Links: ${demoLinks.length}`);
    console.log('');
    console.log('🔑 Demo credentials:');
    console.log('   Email: demo@pocky.me');
    console.log('   Password: demo123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed function
seed().catch(console.error);