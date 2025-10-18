import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import {
  Cog6ToothIcon,
  ChartBarIcon,
  LinkIcon,
  EyeIcon,
  PencilIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const mockStats = {
    totalViews: 1234,
    totalClicks: 567,
    todayViews: 45,
    topLink: 'GitHub',
  };

  const mockLinks = [
    { platform: 'GitHub', username: 'johndoe', clicks: 234, url: '#' },
    { platform: 'LinkedIn', username: 'john-doe', clicks: 156, url: '#' },
    { platform: 'Twitter', username: '@johndoe', clicks: 89, url: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-xl">Pocky</span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-black font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Editar Perfil
              </Link>
              <Link
                to="/analytics"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Cog6ToothIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {user?.displayName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{user?.displayName || user?.username}</p>
                <p className="text-xs text-gray-500">pocky.me/{user?.username}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo de volta, {user?.displayName || user?.username}! 👋
          </h1>
          <p className="text-gray-600">
            Aqui está um resumo do desempenho do seu perfil
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bento-card">
            <div className="flex items-center justify-between mb-2">
              <EyeIcon className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12% esta semana
              </span>
            </div>
            <p className="text-2xl font-bold mb-1">{mockStats.totalViews}</p>
            <p className="text-sm text-gray-600">Visualizações totais</p>
          </div>

          <div className="bento-card">
            <div className="flex items-center justify-between mb-2">
              <LinkIcon className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                +8% esta semana
              </span>
            </div>
            <p className="text-2xl font-bold mb-1">{mockStats.totalClicks}</p>
            <p className="text-sm text-gray-600">Cliques nos links</p>
          </div>

          <div className="bento-card">
            <div className="flex items-center justify-between mb-2">
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold mb-1">{mockStats.todayViews}</p>
            <p className="text-sm text-gray-600">Visualizações hoje</p>
          </div>

          <div className="bento-card">
            <div className="flex items-center justify-between mb-2">
              <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-lg font-bold mb-1">{mockStats.topLink}</p>
            <p className="text-sm text-gray-600">Link mais popular</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Your Links */}
          <div className="bento-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Seus Links</h2>
              <Link
                to="/profile"
                className="text-sm text-black hover:underline flex items-center gap-1"
              >
                <PencilIcon className="w-4 h-4" />
                Editar
              </Link>
            </div>

            <div className="space-y-3">
              {mockLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {link.platform.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{link.platform}</p>
                      <p className="text-xs text-gray-500">{link.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{link.clicks}</p>
                    <p className="text-xs text-gray-500">cliques</p>
                  </div>
                </div>
              ))}

              <div className="text-center py-4">
                <Link
                  to="/profile"
                  className="text-sm text-black hover:underline"
                >
                  + Adicionar mais links
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bento-card">
            <h2 className="text-lg font-semibold mb-6">Ações Rápidas</h2>

            <div className="space-y-3">
              <a
                href={`/${user?.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <EyeIcon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Ver meu perfil</span>
                </div>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400" />
              </a>

              <Link
                to="/profile"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <PencilIcon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Personalizar perfil</span>
                </div>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400" />
              </Link>

              <Link
                to="/analytics"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Ver analytics</span>
                </div>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400" />
              </Link>

              <button className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full">
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Compartilhar perfil</span>
                </div>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bento-card">
          <h2 className="text-lg font-semibold mb-6">Atividade Recente</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Novo visitante no perfil</p>
                  <p className="text-xs text-gray-500">Há 2 minutos</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Clique no link do GitHub</p>
                  <p className="text-xs text-gray-500">Há 15 minutos</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Perfil atualizado</p>
                  <p className="text-xs text-gray-500">Ontem</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;