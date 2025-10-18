import React, { useState } from 'react';
import { FlagIcon, EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ReportsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('pending');

  const mockReports = [
    {
      id: 1,
      type: 'inappropriate_content',
      reportedBy: 'user123',
      reportedUser: 'joaosilva',
      reportedProfile: 'pocky.me/joaosilva',
      reason: 'Conteúdo impróprio no perfil',
      description: 'O perfil contém links para sites inadequados',
      status: 'pending',
      createdAt: '2024-01-20 14:30',
      priority: 'high',
    },
    {
      id: 2,
      type: 'spam',
      reportedBy: 'user456',
      reportedUser: 'mariasantos',
      reportedProfile: 'pocky.me/mariasantos',
      reason: 'Spam',
      description: 'Perfil sendo usado para enviar spam',
      status: 'resolved',
      createdAt: '2024-01-19 09:15',
      priority: 'medium',
      resolvedAt: '2024-01-19 16:45',
      resolvedBy: 'admin',
      action: 'warning',
    },
    {
      id: 3,
      type: 'impersonation',
      reportedBy: 'user789',
      reportedUser: 'fakeuser',
      reportedProfile: 'pocky.me/fakeuser',
      reason: 'Impersonação',
      description: 'Perfil fingindo ser outra pessoa',
      status: 'pending',
      createdAt: '2024-01-18 11:20',
      priority: 'high',
    },
    {
      id: 4,
      type: 'inappropriate_content',
      reportedBy: 'user101',
      reportedUser: 'pedrocosta',
      reportedProfile: 'pocky.me/pedrocosta',
      reason: 'Conteúdo ofensivo',
      description: 'Conteúdo discriminatório no perfil',
      status: 'investigating',
      createdAt: '2024-01-17 16:00',
      priority: 'high',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', class: px-2 py-1 rounded-full text-xs font-medium bg-'$(  case suspended in    active) echo 'green-100 text-green-800';;    inactive) echo 'gray-100 text-gray-800';;    suspended) echo 'yellow-100 text-yellow-800';;    banned) echo 'red-100 text-red-800';;  esac) },
      investigating: { label: 'Investigando', class: px-2 py-1 rounded-full text-xs font-medium bg-'$(  case active in    active) echo 'green-100 text-green-800';;    inactive) echo 'gray-100 text-gray-800';;    suspended) echo 'yellow-100 text-yellow-800';;    banned) echo 'red-100 text-red-800';;  esac) },
      resolved: { label: 'Resolvido', class: px-2 py-1 rounded-full text-xs font-medium bg-'$(  case inactive in    active) echo 'green-100 text-green-800';;    inactive) echo 'gray-100 text-gray-800';;    suspended) echo 'yellow-100 text-yellow-800';;    banned) echo 'red-100 text-red-800';;  esac) },
      rejected: { label: 'Rejeitado', class: px-2 py-1 rounded-full text-xs font-medium bg-'$(  case banned in    active) echo 'green-100 text-green-800';;    inactive) echo 'gray-100 text-gray-800';;    suspended) echo 'yellow-100 text-yellow-800';;    banned) echo 'red-100 text-red-800';;  esac) },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <span className={config.class}>{config.label}</span>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Baixa', class: px-2 py-1 rounded-full text-xs font-medium bg-'$(  case inactive in    active) echo 'green-100 text-green-800';;    inactive) echo 'gray-100 text-gray-800';;    suspended) echo 'yellow-100 text-yellow-800';;    banned) echo 'red-100 text-red-800';;  esac) },
      medium: { label: 'Média', class: px-2 py-1 rounded-full text-xs font-medium bg-'$(  case suspended in    active) echo 'green-100 text-green-800';;    inactive) echo 'gray-100 text-gray-800';;    suspended) echo 'yellow-100 text-yellow-800';;    banned) echo 'red-100 text-red-800';;  esac) },
      high: { label: 'Alta', class: px-2 py-1 rounded-full text-xs font-medium bg-'$(  case banned in    active) echo 'green-100 text-green-800';;    inactive) echo 'gray-100 text-gray-800';;    suspended) echo 'yellow-100 text-yellow-800';;    banned) echo 'red-100 text-red-800';;  esac) },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <span className={config.class}>{config.label}</span>;
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = {
      inappropriate_content: '⚠️',
      spam: '📧',
      impersonation: '👤',
      harassment: '😡',
      fake_profile: '🎭',
    };

    return typeConfig[type as keyof typeof typeConfig] || '📋';
  };

  const filteredReports = mockReports.filter(report =>
    statusFilter === 'all' || report.status === statusFilter
  );

  const handleResolveReport = (reportId: number, action: string) => {
    // TODO: Implementar resolução de report
    console.log(`Resolving report ${reportId} with action: ${action}`);
  };

  const handleRejectReport = (reportId: number) => {
    // TODO: Implementar rejeição de report
    console.log(`Rejecting report ${reportId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600">Gerencie denúncias e conteúdo impróprio</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Reportes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">47</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <FlagIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Investigação</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <span className="text-2xl">🔍</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolvidos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">27</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="investigating">Investigando</option>
              <option value="resolved">Resolvidos</option>
              <option value="rejected">Rejeitados</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Mostrando {filteredReports.length} reportes
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{getTypeIcon(report.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.reason}</h3>
                    <p className="text-sm text-gray-500">
                      Reportado por {report.reportedBy} • {report.createdAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(report.status)}
                    {getPriorityBadge(report.priority)}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-700">{report.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500">
                      Perfil: <a href={`https://${report.reportedProfile}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {report.reportedProfile}
                      </a>
                    </span>
                    <span className="text-gray-500">
                      Usuário: <span className="font-medium">@{report.reportedUser}</span>
                    </span>
                  </div>
                </div>

                {report.status === 'resolved' && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckIcon className="w-4 h-4 text-green-600" />
                      <span>
                        Resolvido por {report.resolvedBy} em {report.resolvedAt} •
                        Ação: {report.action === 'warning' ? 'Aviso' : report.action === 'suspension' ? 'Suspensão' : 'Banimento'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <EyeIcon className="w-5 h-5" />
                </button>

                {report.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleResolveReport(report.id, 'warning')}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                    >
                      Aviso
                    </button>
                    <button
                      onClick={() => handleResolveReport(report.id, 'suspension')}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200"
                    >
                      Suspender
                    </button>
                    <button
                      onClick={() => handleResolveReport(report.id, 'ban')}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                    >
                      Banir
                    </button>
                    <button
                      onClick={() => handleRejectReport(report.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                      Rejeitar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="admin-card text-center py-12">
          <FlagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum reporte encontrado</h3>
          <p className="text-gray-500">
            {statusFilter === 'all'
              ? 'Não há reportes no momento.'
              : `Não há reportes com status "${statusFilter}".`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;