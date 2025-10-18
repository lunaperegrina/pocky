import { useState, useCallback } from 'react';
import { profilesApi, type CreateProfileData, type SocialLink, type CreateSocialLinkData } from '../lib/profiles';
import toast from 'react-hot-toast';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createProfile = useCallback(async (data: CreateProfileData) => {
    setIsLoading(true);
    try {
      const profile = await profilesApi.createProfile(data);
      toast.success('Perfil criado com sucesso!');
      return profile;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao criar perfil');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (id: string, data: Partial<CreateProfileData>) => {
    setIsLoading(true);
    try {
      const profile = await profilesApi.updateProfile(id, data);
      toast.success('Perfil atualizado com sucesso!');
      return profile;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao atualizar perfil');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createSocialLink = useCallback(async (data: CreateSocialLinkData) => {
    setIsLoading(true);
    try {
      const link = await profilesApi.createSocialLink(data);
      toast.success('Link adicionado com sucesso!');
      return link;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao adicionar link');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSocialLink = useCallback(async (id: string, data: Partial<CreateSocialLinkData>) => {
    setIsLoading(true);
    try {
      const link = await profilesApi.updateSocialLink(id, data);
      toast.success('Link atualizado com sucesso!');
      return link;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao atualizar link');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSocialLink = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await profilesApi.deleteSocialLink(id);
      toast.success('Link removido com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao remover link');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const scrapeSocialData = useCallback(async (platform: string, username: string) => {
    setIsLoading(true);
    try {
      const data = await profilesApi.scrapeSocialData(platform, username);
      toast.success('Dados atualizados com sucesso!');
      return data;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Não foi possível buscar os dados do perfil');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    createProfile,
    updateProfile,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    scrapeSocialData,
  };
};