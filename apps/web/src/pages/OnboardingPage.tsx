import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const profileSchema = z.object({
  displayName: z.string().min(1, 'Nome é obrigatório').max(50, 'Máximo 50 caracteres'),
  bio: z.string().max(500, 'Máximo 500 caracteres').optional(),
  avatarUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

const socialLinkSchema = z.object({
  platform: z.enum(['linkedin', 'github', 'twitter', 'instagram', 'youtube', 'website', 'email']),
  username: z.string().min(1, 'Usuário é obrigatório'),
});

type SocialLink = z.infer<typeof socialLinkSchema>;

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [newLink, setNewLink] = useState<SocialLink>({ platform: 'github', username: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    watch: watchProfile,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      bio: '',
      avatarUrl: '',
    },
  });

  const addSocialLink = () => {
    if (newLink.username.trim()) {
      setSocialLinks([...socialLinks, newLink]);
      setNewLink({ platform: 'github', username: '' });
    }
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      // TODO: Salvar perfil no backend
      updateUser({ displayName: data.displayName });
      setStep(2);
    } catch (error) {
      toast.error('Erro ao salvar perfil');
    }
  };

  const onFinishOnboarding = async () => {
    setIsLoading(true);
    try {
      // TODO: Salvar links sociais no backend
      toast.success('Perfil configurado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao salvar links sociais');
    } finally {
      setIsLoading(false);
    }
  };

  const platforms = [
    { value: 'linkedin', label: 'LinkedIn', icon: 'in', color: 'blue' },
    { value: 'github', label: 'GitHub', icon: 'GH', color: 'gray' },
    { value: 'twitter', label: 'Twitter/X', icon: 'X', color: 'sky' },
    { value: 'instagram', label: 'Instagram', icon: 'IG', color: 'pink' },
    { value: 'youtube', label: 'YouTube', icon: 'YT', color: 'red' },
    { value: 'website', label: 'Website', icon: '🌐', color: 'green' },
    { value: 'email', label: 'Email', icon: '@', color: 'indigo' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Perfil</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${
              step >= 2 ? 'bg-black' : 'bg-gray-200'
            }`} />
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Redes Sociais</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Configure seu perfil</h2>
              <p className="text-gray-600">
                Adicione suas informações para criar seu perfil bento style
              </p>
            </div>

            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto de avatar (opcional)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">
                      {watchProfile('displayName')?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <input
                      {...registerProfile('avatarUrl')}
                      type="url"
                      placeholder="https://exemplo.com/avatar.jpg"
                      className="input-field"
                    />
                    {profileErrors.avatarUrl && (
                      <p className="text-red-500 text-sm mt-1">{profileErrors.avatarUrl.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome para exibição
                </label>
                <input
                  {...registerProfile('displayName')}
                  type="text"
                  placeholder="Seu nome"
                  className="input-field"
                />
                {profileErrors.displayName && (
                  <p className="text-red-500 text-sm mt-1">{profileErrors.displayName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio (opcional)
                </label>
                <textarea
                  {...registerProfile('bio')}
                  rows={4}
                  placeholder="Conte um pouco sobre você..."
                  className="input-field resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {watchProfile('bio')?.length || 0}/500 caracteres
                </p>
              </div>

              <div className="flex justify-between">
                <Link to="/login" className="btn-secondary flex items-center gap-2">
                  <ArrowLeftIcon className="w-4 h-4" />
                  Voltar
                </Link>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  Próximo
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Adicione suas redes sociais</h2>
              <p className="text-gray-600">
                Adicione @ do seu perfil e nós buscaremos as informações automaticamente
              </p>
            </div>

            {/* Add new link */}
            <div className="mb-6">
              <div className="flex gap-2">
                <select
                  value={newLink.platform}
                  onChange={(e) => setNewLink({ ...newLink, platform: e.target.value as SocialLink['platform'] })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  {platforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="@seuusuario"
                  value={newLink.username}
                  onChange={(e) => setNewLink({ ...newLink, username: e.target.value })}
                  className="flex-1 input-field"
                />
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Added links */}
            <div className="space-y-2 mb-6">
              {socialLinks.map((link, index) => {
                const platform = platforms.find(p => p.value === link.platform);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-${platform?.color}-100 rounded flex items-center justify-center`}>
                        <span className={`text-${platform?.color}-600 text-sm font-medium`}>
                          {platform?.icon}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{platform?.label}</span>
                      <span className="text-gray-500">@{link.username}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
              {socialLinks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhuma rede social adicionada ainda</p>
                  <p className="text-sm">Adicione acima para continuar</p>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Voltar
              </button>
              <button
                type="button"
                onClick={onFinishOnboarding}
                disabled={isLoading || socialLinks.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Finalizando...' : 'Finalizar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;