import api from './api';

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  themeId?: string;
  customDomain?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileData {
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  themeId?: string;
}

export interface UpdateProfileData extends Partial<CreateProfileData> {}

export interface PublicProfile {
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  links: SocialLink[];
  theme?: {
    primaryColor: string;
    backgroundColor: string;
  };
}

export interface SocialLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  displayName: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface CreateSocialLinkData {
  platform: string;
  username: string;
  url?: string;
  displayName?: string;
  icon?: string;
  order?: number;
}

export const profilesApi = {
  // Get user profile
  getProfile: async (): Promise<Profile> => {
    const response = await api.get('/profiles/me');
    return response.data;
  },

  // Create profile
  createProfile: async (data: CreateProfileData): Promise<Profile> => {
    const response = await api.post('/profiles', data);
    return response.data;
  },

  // Update profile
  updateProfile: async (id: string, data: UpdateProfileData): Promise<Profile> => {
    const response = await api.put(`/profiles/${id}`, data);
    return response.data;
  },

  // Get public profile by username
  getPublicProfile: async (username: string): Promise<PublicProfile> => {
    const response = await api.get(`/profiles/${username}`);
    return response.data;
  },

  // Get social links for a profile
  getSocialLinks: async (profileId: string): Promise<SocialLink[]> => {
    const response = await api.get(`/links/profile/${profileId}`);
    return response.data;
  },

  // Create social link
  createSocialLink: async (data: CreateSocialLinkData): Promise<SocialLink> => {
    const response = await api.post('/links', data);
    return response.data;
  },

  // Update social link
  updateSocialLink: async (id: string, data: Partial<CreateSocialLinkData>): Promise<SocialLink> => {
    const response = await api.put(`/links/${id}`, data);
    return response.data;
  },

  // Delete social link
  deleteSocialLink: async (id: string): Promise<void> => {
    await api.delete(`/links/${id}`);
  },

  // Scrape social media data
  scrapeSocialData: async (platform: string, username: string): Promise<any> => {
    const response = await api.post('/links/scrape', { platform, username });
    return response.data;
  },
};