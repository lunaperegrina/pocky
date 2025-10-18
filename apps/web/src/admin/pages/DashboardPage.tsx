import React from 'react';
import {
  UsersIcon,
  UserGroupIcon,
  LinkIcon,
  EyeIcon,
  ChartBarIcon,
  TrendingUpIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      name: 'Total de Usuários',
      value: '2,543',
      change: '+12%',
      changeType: 'positive',
      icon: UsersIcon,
    },
    {
      name: 'Perfis Criados',
      value: '1,842',
      change: '+8%',
      changeType: 'positive',
      icon: UserGroupIcon,
    },
    {
      name: 'Links Sociais',
      value: '5,234',
      change: '+15%',
      changeType: 'positive',
      icon: LinkIcon,
    },
    {
      name: 'Visualizações Hoje',
      value: '12,453',
      change: '+23%',
      changeType: 'positive',
      icon: EyeIcon,
    },
  ];

  const recentUsers = [
    { id: 1, name: 'João Silva', email: 'joao@example.com', username: 'joaosilva', joinedAt: '2024-01-15' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', username: 'mariasantos', joinedAt: '2024-01-14' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', username: 'pedrocosta', joinedAt: '2024-01-14' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@example.com', username: 'anaoliveira', joinedAt: '2024-01-13' },
  ];

  const topPlatforms = [
    { name: 'GitHub', users: 1234, percentage: 45, color: 'bg-gray-600' },
    { name: 'LinkedIn', users: 987, percentage: 35, color: 'bg-blue-600' },
    { name: 'Twitter', users: 654, percentage: 25, color: 'bg-sky-500' },
    { name: 'Instagram', users: 432, percentage: 18, color: 'bg-pink-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema Pocky</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs mês passado</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2 admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Usuários Recentes</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Ver todos
            </button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400">{user.joinedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Platforms */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Plataformas Populares</h2>
            <ChartBarIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topPlatforms.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                  <span className="text-sm text-gray-500">{platform.users} usuários</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${platform.color} h-2 rounded-full`}
                    style={{ width: `${platform.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <UsersIcon className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Gerenciar Usuários</span>
            </div>
            <p className="text-sm text-gray-600">Visualize e gerencie todos os usuários cadastrados</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUpIcon className="w-5 h-5 text-green-600" />
              <span className="font-medium">Ver Analytics</span>
            </div>
            <p className="text-sm text-gray-600">Analise o desempenho da plataforma</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <GlobeAltIcon className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Relatórios</span>
            </div>
            <p className="text-sm text-gray-600">Visualize relatórios e estatísticas detalhadas</p>
          </button>
        </div>
      </div>

      {/* Device Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Dispositivos</h2>
            <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Desktop</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Mobile</span>
              <span className="text-sm font-medium">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tablet</span>
              <span className="text-sm font-medium">5%</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Status do Sistema</h2>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API</span>
              <span className="status-active">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="status-active">Operacional</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="status-active">Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;