import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import {
  ArrowLeftIcon,
  PhotoIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  const mockProfile = {
    displayName: user?.displayName || 'John Doe',
    bio: 'Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis.',
    avatarUrl: '',
    links: [
      { id: '1', platform: 'GitHub', username: 'johndoe', url: '#', order: 1 },
      { id: '2', platform: 'LinkedIn', username: 'john-doe', url: '#', order: 2 },
      { id: '3', platform: 'Twitter', username: '@johndoe', url: '#', order: 3 },
    ],
    theme: {
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
              Voltar ao Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-secondary flex items-center gap-2">
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              Visualizar perfil
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Editar Perfil</h1>
          <p className="text-gray-600">
            Personalize seu perfil bento style e adicione seus links
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="bento-card">
              <h2 className="text-lg font-semibold mb-4">Informações do Perfil</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto do perfil
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      {mockProfile.avatarUrl ? (
                        <img
                          src={mockProfile.avatarUrl}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-2xl">
                          {mockProfile.displayName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <button className="btn-secondary flex items-center gap-2">
                      <PhotoIcon className="w-4 h-4" />
                      Alterar foto
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome para exibição
                  </label>
                  <input
                    type="text"
                    value={mockProfile.displayName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    value={mockProfile.bio}
                    className="input-field resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {mockProfile.bio.length}/500 caracteres
                  </p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bento-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Links Sociais</h2>
                <button className="btn-secondary flex items-center gap-2">
                  <PlusIcon className="w-4 h-4" />
                  Adicionar link
                </button>
              </div>

              <div className="space-y-3">
                {mockProfile.links.map((link) => (
                  <div key={link.id} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">
                        {link.platform.charAt(0)}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={link.username}
                      className="flex-1 input-field"
                    />
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="bento-card">
              <h2 className="text-lg font-semibold mb-4">Personalização</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tema
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Clássico', primary: '#000000', bg: '#ffffff' },
                      { name: 'Escuro', primary: '#ffffff', bg: '#000000' },
                      { name: 'Azul', primary: '#3b82f6', bg: '#eff6ff' },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className="p-3 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: theme.bg }}
                          />
                        </div>
                        <p className="text-xs font-medium">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="sticky top-8">
            <div className="bento-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Pré-visualização</h2>
                <span className="text-xs text-gray-500">pocky.me/{user?.username}</span>
              </div>

              {/* Preview content */}
              <div className="bg-gray-50 rounded-lg p-6 min-h-[600px]">
                {/* Profile header */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-600 text-3xl font-bold">
                      {mockProfile.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{mockProfile.displayName}</h3>
                  <p className="text-gray-600 text-sm mb-4">@{user?.username}</p>
                  <p className="text-gray-700 max-w-xs mx-auto">
                    {mockProfile.bio}
                  </p>
                </div>

                {/* Social links preview */}
                <div className="space-y-3">
                  {mockProfile.links.map((link) => (
                    <div
                      key={link.id}
                      className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-gray-200"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {link.platform.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{link.platform}</p>
                        <p className="text-xs text-gray-500">{link.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Salvar alterações
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;