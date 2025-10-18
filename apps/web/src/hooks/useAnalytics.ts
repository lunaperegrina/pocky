import { useCallback } from 'react';
import { analyticsApi } from '../lib/analytics';

export const useAnalytics = () => {
  const trackLinkClick = useCallback(async (profileId: string, linkId: string) => {
    try {
      await analyticsApi.trackLinkClick({
        profileId,
        linkId,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (error) {
      console.error('Failed to track link click:', error);
    }
  }, []);

  const trackProfileView = useCallback(async (profileId: string) => {
    try {
      await analyticsApi.trackProfileView({
        profileId,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
    } catch (error) {
      console.error('Failed to track profile view:', error);
    }
  }, []);

  const getProfileAnalytics = useCallback(async (profileId: string, period = '30d') => {
    try {
      return await analyticsApi.getProfileAnalytics(profileId, period);
    } catch (error) {
      console.error('Failed to get profile analytics:', error);
      throw error;
    }
  }, []);

  const getLinkAnalytics = useCallback(async (linkId: string, period = '30d') => {
    try {
      return await analyticsApi.getLinkAnalytics(linkId, period);
    } catch (error) {
      console.error('Failed to get link analytics:', error);
      throw error;
    }
  }, []);

  const getDashboardSummary = useCallback(async (profileId: string) => {
    try {
      return await analyticsApi.getDashboardSummary(profileId);
    } catch (error) {
      console.error('Failed to get dashboard summary:', error);
      throw error;
    }
  }, []);

  return {
    trackLinkClick,
    trackProfileView,
    getProfileAnalytics,
    getLinkAnalytics,
    getDashboardSummary,
  };
};