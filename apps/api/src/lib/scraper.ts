import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export interface ScrapedData {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  followers?: number;
  verified?: boolean;
  error?: string;
}

export class SocialMediaScraper {
  private browser: any;

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas-usage',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
      ],
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async scrapeLinkedIn(username: string): Promise<ScrapedData> {
    if (!this.browser) await this.init();

    const page = await this.browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    try {
      const url = `https://www.linkedin.com/in/${username}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

      const content = await page.content();
      const $ = cheerio.load(content);

      // Extract data
      const displayName = $('h1.text()').trim() || '';
      const bio = $('.text-body-medium.break-words').first().text().trim() || '';
      const avatarUrl = $('img.profile-photo-edit__preview').attr('src') || '';
      const location = $('.text-body-small.inline.t-black--light.break-words').first().text().trim() || '';

      return {
        displayName,
        bio,
        avatarUrl,
        location,
      };
    } catch (error) {
      console.error('LinkedIn scraping error:', error);
      return { error: 'Failed to scrape LinkedIn profile' };
    } finally {
      await page.close();
    }
  }

  async scrapeGitHub(username: string): Promise<ScrapedData> {
    if (!this.browser) await this.init();

    const page = await this.browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    try {
      const url = `https://github.com/${username}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

      const content = await page.content();
      const $ = cheerio.load(content);

      // Extract data
      const displayName = $('span.p-name.vcard-fullname').text().trim() || '';
      const bio = $('p.p-note').text().trim() || '';
      const avatarUrl = $('img.avatar-user').attr('src') || '';
      const location = $('.p-label').text().trim() || '';
      const website = $('.Link--primary').first().attr('href') || '';

      // Get followers count (approximate)
      const followersText = $('.text-bold.color-fg-default').first().text().trim();
      const followers = parseInt(followersText.replace(/[^0-9]/g, '')) || undefined;

      return {
        displayName,
        bio,
        avatarUrl,
        location,
        website,
        followers,
      };
    } catch (error) {
      console.error('GitHub scraping error:', error);
      return { error: 'Failed to scrape GitHub profile' };
    } finally {
      await page.close();
    }
  }

  async scrapeTwitter(username: string): Promise<ScrapedData> {
    if (!this.browser) await this.init();

    const page = await this.browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    try {
      // Remove @ if present
      const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
      const url = `https://twitter.com/${cleanUsername}`;

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

      const content = await page.content();
      const $ = cheerio.load(content);

      // Extract data (Twitter's structure is complex, so we'll try basic extraction)
      const displayName = $('h2[role="heading"]').first().text().trim() || '';
      const bio = $('[data-testid="UserDescription"]').text().trim() || '';
      const avatarUrl = $('img[data-testid="UserAvatar"]').attr('src') || '';
      const location = $('[data-testid="UserLocation"]').text().trim() || '';
      const website = $('[data-testid="UserUrl"]').text().trim() || '';

      // Check if verified
      const verified = $('[data-testid="UserVerifiedBadge"]').length > 0;

      return {
        displayName,
        bio,
        avatarUrl,
        location,
        website,
        verified,
      };
    } catch (error) {
      console.error('Twitter scraping error:', error);
      return { error: 'Failed to scrape Twitter profile' };
    } finally {
      await page.close();
    }
  }

  async scrapeInstagram(username: string): Promise<ScrapedData> {
    if (!this.browser) await this.init();

    const page = await this.browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    try {
      // Remove @ if present
      const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
      const url = `https://www.instagram.com/${cleanUsername}/`;

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

      const content = await page.content();
      const $ = cheerio.load(content);

      // Instagram is heavily dynamic, so this might not work reliably
      const displayName = $('h1').text().trim() || '';
      const bio = $('div.-vDIg span').text().trim() || '';
      const avatarUrl = $('img[data-testid="user-avatar"]').attr('src') || '';

      return {
        displayName,
        bio,
        avatarUrl,
      };
    } catch (error) {
      console.error('Instagram scraping error:', error);
      return { error: 'Failed to scrape Instagram profile' };
    } finally {
      await page.close();
    }
  }

  async scrapeSocialMedia(platform: string, username: string): Promise<ScrapedData> {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return this.scrapeLinkedIn(username);
      case 'github':
        return this.scrapeGitHub(username);
      case 'twitter':
        return this.scrapeTwitter(username);
      case 'instagram':
        return this.scrapeInstagram(username);
      default:
        return { error: `Unsupported platform: ${platform}` };
    }
  }
}

export const scraper = new SocialMediaScraper();