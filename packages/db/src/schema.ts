import { pgTable, text, timestamp, uuid, integer, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const userStatusEnum = pgEnum('user_status', ['active', 'inactive', 'suspended', 'banned']);
export const socialPlatformEnum = pgEnum('social_platform', [
  'linkedin', 'github', 'twitter', 'instagram', 'youtube', 'website', 'email'
]);

// Tables
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  username: text('username').notNull().unique(),
  status: userStatusEnum('status').notNull().default('active'),
  emailVerified: boolean('email_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
});

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  themeId: uuid('theme_id').references(() => themes.id),
  customDomain: text('custom_domain').unique(),
  isPublic: boolean('is_public').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const themes = pgTable('themes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  primaryColor: text('primary_color').notNull().default('#000000'),
  backgroundColor: text('background_color').notNull().default('#ffffff'),
  cardStyle: text('card_style').notNull().default('rounded'),
  fontFamily: text('font_family').notNull().default('inter'),
  customCSS: text('custom_css'),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const socialLinks = pgTable('social_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  platform: socialPlatformEnum('platform').notNull(),
  username: text('username').notNull(),
  url: text('url').notNull(),
  displayName: text('display_name').notNull(),
  icon: text('icon').notNull(),
  order: integer('order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  scrapedData: jsonb('scraped_data'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const linkClicks = pgTable('link_clicks', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  socialLinkId: uuid('social_link_id').notNull().references(() => socialLinks.id, { onDelete: 'cascade' }),
  ip: text('ip').notNull(),
  userAgent: text('user_agent'),
  referer: text('referer'),
  country: text('country'),
  city: text('city'),
  device: text('device'),
  browser: text('browser'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const profileViews = pgTable('profile_views', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  ip: text('ip').notNull(),
  userAgent: text('user_agent'),
  referer: text('referer'),
  country: text('country'),
  city: text('city'),
  device: text('device'),
  browser: text('browser'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(), // 'inappropriate_content', 'spam', 'impersonation', 'harassment', 'fake_profile'
  reportedBy: uuid('reported_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  reportedUserId: uuid('reported_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  reportedProfileId: uuid('reported_profile_id').references(() => profiles.id, { onDelete: 'cascade' }),
  reason: text('reason').notNull(),
  description: text('description'),
  status: text('status').notNull().default('pending'), // 'pending', 'investigating', 'resolved', 'rejected'
  priority: text('priority').notNull().default('medium'), // 'low', 'medium', 'high'
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  resolvedAt: timestamp('resolved_at'),
  resolvedBy: uuid('resolved_by').references(() => users.id, { onDelete: 'set null' }),
  action: text('action'), // 'warning', 'suspension', 'ban', 'no_action'
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow()),
  lastAccessedAt: timestamp('last_accessed_at').notNull().defaultNow(),
});

export const analytics = pgTable('analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: timestamp('date').notNull(),
  totalUsers: integer('total_users').notNull().default(0),
  activeUsers: integer('active_users').notNull().default(0),
  newUsers: integer('new_users').notNull().default(0),
  totalProfiles: integer('total_profiles').notNull().default(0),
  totalLinks: integer('total_links').notNull().default(0),
  totalViews: integer('total_views').notNull().default(0),
  totalClicks: integer('total_clicks').notNull().default(0),
  topPlatforms: jsonb('top_platforms'),
  geographicData: jsonb('geographic_data'),
  deviceData: jsonb('device_data'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export type Theme = typeof themes.$inferSelect;
export type NewTheme = typeof themes.$inferInsert;

export type SocialLink = typeof socialLinks.$inferSelect;
export type NewSocialLink = typeof socialLinks.$inferInsert;

export type LinkClick = typeof linkClicks.$inferSelect;
export type NewLinkClick = typeof linkClicks.$inferInsert;

export type ProfileView = typeof profileViews.$inferSelect;
export type NewProfileView = typeof profileViews.$inferInsert;

export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Analytics = typeof analytics.$inferSelect;
export type NewAnalytics = typeof analytics.$inferInsert;