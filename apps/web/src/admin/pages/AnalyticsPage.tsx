import React from 'react';
import {
  ChartBarIcon,
  EyeIcon,
  LinkIcon,
  UserGroupIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

const AnalyticsPage: React.FC = () => {
  const overviewStats = [
    {
      name: 'Visualizações Totais',
      value: '45.2K',
      change: '+12.5%',
      icon: EyeIcon,
    },
    {
      name: 'Visitantes Únicos',
      value: '12.8K',
      change: '+8.2%',
      icon: UserGroupIcon,
    },
    {
      name: 'Cliques em Links',
      value: '8.9K',
      change: '+15.3%',
      icon: LinkIcon,
    },
    {
      name: 'Taxa de Cliques',
      value: '19.7%',
      change: '+2.1%',
      icon: ChartBarIcon,
    },
  ];

  const topProfiles = [
    { username: 'joaosilva', views: 2345, clicks: 892, ctr: '38.1%' },
    { username: 'mariasantos', views: 1876, clicks: 654, ctr: '34.9%' },
    { username: 'pedrocosta', views: 1543, clicks: 523, ctr: '33.9%' },
    { username: 'anaoliveira', views: 1234, clicks: 445, ctr: '36.1%' },
    { username: 'carlospereira', views: 987, clicks: 234, ctr: '23.7%' },
  ];

  const deviceStats = [
    { device: 'Desktop', percentage: 65, users: 8320, color: 'bg-blue-600' },
    { device: 'Mobile', percentage: 30, users: 3840, color: 'bg-green-600' },
    { device: 'Tablet', percentage: 5, users: 640, color: 'bg-purple-600' },
  ];

  const geographicData = [
    { country: 'Brasil', users: 8234, percentage: 64.2 },
    { country: 'Estados Unidos', users: 2156, percentage: 16.8 },
    { country: 'Portugal', users: 1234, percentage: 9.6 },
    { country: 'Argentina', users: 876, percentage: 6.8 },
    { country: 'Outros', users: 340, percentage: 2.6 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Visualize estatísticas e métricas da plataforma</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">vs mês passado</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Profiles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Perfis Mais Populares</h2>
            <EyeIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topProfiles.map((profile, index) => (
              <div key={profile.username} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">@{profile.username}</p>
                    <p className="text-sm text-gray-500">{profile.views.toLocaleString()} visualizações</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{profile.clicks} cliques</p>
                  <p className="text-sm text-gray-500">{profile.ctr} CTR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Dispositivos</h2>
            <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {deviceStats.map((device) => (
              <div key={device.device} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{device.device}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{device.percentage}%</span>
                    <span className="text-sm text-gray-500 ml-1">({device.users.toLocaleString()})</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${device.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Distribuição Geográfica</h2>
          <GlobeAltIcon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {geographicData.map((country) => (
              <div key={country.country} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{country.country}</span>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${country.percentage * 2}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {country.percentage}%
                  </span>
                  <span className="text-sm text-gray-500 w-16 text-right">
                    {country.users.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <GlobeAltIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                Mapa interativo de visualizações globais
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Em breve: integração com mapa em tempo real
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Fontes de Tráfego</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Acesso Direto</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Busca Orgânica</span>
              <span className="text-sm font-medium text-gray-900">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Redes Sociais</span>
              <span className="text-sm font-medium text-gray-900">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Referências</span>
              <span className="text-sm font-medium text-gray-900">10%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tempo de Carregamento</span>
              <span className="text-sm font-medium text-green-600">1.2s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Taxa de Rejeição</span>
              <span className="text-sm font-medium text-gray-900">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sessões por Usuário</span>
              <span className="text-sm font-medium text-gray-900">2.4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Duração Média</span>
              <span className="text-sm font-medium text-gray-900">3m 45s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Exportar Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <ChartBarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Relatório Completo</p>
              <p className="text-sm text-gray-500">PDF com todas as métricas</p>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <LinkIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Dados em CSV</p>
              <p className="text-sm text-gray-500">Planilha com dados brutos</p>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-center">
              <EyeIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Dashboard</p>
              <p className="text-sm text-gray-500">Visualização interativa</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;