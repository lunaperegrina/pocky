import api from './api';

export interface AnalyticsData {
  profileId: string;
  period: string;
  totalClicks: number;
  clicksByLink: Array<{
    linkId: string;
    platform: string;
    clicks: number;
  }>;
  dailyStats: Array<{
    date: string;
    views: number;
    clicks: number;
  }>;
  topReferrers: Array<{
    referrer: string;
    count: number;
  }>;
  devices: Record<string, number>;
  locations: Record<string, number>;
}

export interface LinkClickData {
  profileId: string;
  linkId: string;
  userAgent?: string;
  referrer?: string;
}

export interface ProfileViewData {
  profileId: string;
  userAgent?: string;
  referrer?: string;
}

export const analyticsApi = {
  // Track link click
  trackLinkClick: async (data: LinkClickData): Promise<void> => {
    await api.post('/analytics/track', data);
  },

  // Track profile view
  trackProfileView: async (data: ProfileViewData): Promise<void> => {
    await api.post('/analytics/view', data);
  },

  // Get profile analytics
  getProfileAnalytics: async (profileId: string, period = '30d'): Promise<AnalyticsData> => {
    const response = await api.get(`/analytics/profile/${profileId}?period=${period}`);
    return response.data;
  },

  // Get link analytics
  getLinkAnalytics: async (linkId: string, period = '30d'): Promise<any> => {
    const response = await api.get(`/analytics/link/${linkId}?period=${period}`);
    return response.data;
  },

  // Get dashboard summary
  getDashboardSummary: async (profileId: string): Promise<any> => {
    const response = await api.get(`/analytics/dashboard/${profileId}`);
    return response.data;
  },
};