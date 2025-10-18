import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShareIcon,
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [isCopied, setIsCopied] = useState(false);

  const mockProfile = {
    username,
    displayName: 'John Doe',
    bio: 'Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis. Focado em React, TypeScript e Node.js.',
    avatarUrl: '',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    links: [
      {
        id: '1',
        platform: 'GitHub',
        username: 'johndoe',
        url: 'https://github.com/johndoe',
        icon: '💻',
        color: 'gray'
      },
      {
        id: '2',
        platform: 'LinkedIn',
        username: 'john-doe',
        url: 'https://linkedin.com/in/john-doe',
        icon: '💼',
        color: 'blue'
      },
      {
        id: '3',
        platform: 'Twitter',
        username: '@johndoe',
        url: 'https://twitter.com/johndoe',
        icon: '🐦',
        color: 'sky'
      },
      {
        id: '4',
        platform: 'Instagram',
        username: '@johndoe',
        url: 'https://instagram.com/johndoe',
        icon: '📸',
        color: 'pink'
      },
      {
        id: '5',
        platform: 'Email',
        username: 'john@example.com',
        url: 'mailto:john@example.com',
        icon: '✉️',
        color: 'indigo'
      }
    ],
    projects: [
      {
        title: 'Pocky',
        description: 'Plataforma de criação de perfis bento style',
        tech: ['React', 'TypeScript', 'Hono'],
        url: 'https://github.com/johndoe/pocky'
      },
      {
        title: 'Component Library',
        description: 'Biblioteca de componentes React reutilizáveis',
        tech: ['React', 'Storybook', 'Tailwind'],
        url: 'https://github.com/johndoe/components'
      }
    ]
  };

  const shareProfile = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const trackLinkClick = (url: string) => {
    // TODO: Implementar rastreamento de cliques
    console.log('Link clicked:', url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-xl">Pocky</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={shareProfile}
              className="btn-secondary flex items-center gap-2"
            >
              <ShareIcon className="w-4 h-4" />
              {isCopied ? 'Copiado!' : 'Compartilhar'}
            </button>
            <Link
              to="/login"
              className="btn-secondary flex items-center gap-2"
            >
              <PencilIcon className="w-4 h-4" />
              Criar seu perfil
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            {mockProfile.avatarUrl ? (
              <img
                src={mockProfile.avatarUrl}
                alt={mockProfile.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-4xl font-bold">
                {mockProfile.displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-2">{mockProfile.displayName}</h1>
          <p className="text-xl text-gray-600 mb-4">@{mockProfile.username}</p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            {mockProfile.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {mockProfile.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Main Profile Card */}
          <div className="md:col-span-2 md:row-span-2 bento-card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Sobre mim</h2>
                <p className="text-gray-600">
                  Desenvolvedor com 5+ anos de experiência, apaixonado por
                  criar produtos digitais que fazem a diferença.
                </p>
              </div>
              <div className="text-2xl">👋</div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">🚀 O que eu faço</h3>
                <p className="text-gray-700">
                  Desenvolvimento de aplicações web modernas com foco em
                  performance e experiência do usuário.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🎯 Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {['Frontend', 'Backend', 'UI/UX', 'DevOps'].map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-gray-100 rounded-lg text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">📍 Localização</h3>
                <p className="text-gray-700">São Paulo, Brasil</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {mockProfile.links.map((link, index) => (
            <div
              key={link.id}
              className="bento-card cursor-pointer hover:shadow-lg transition-all duration-200 group"
              onClick={() => trackLinkClick(link.url)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{link.icon}</div>
                  <div>
                    <h3 className="font-semibold">{link.platform}</h3>
                    <p className="text-sm text-gray-600">{link.username}</p>
                  </div>
                </div>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Projetos em Destaque</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mockProfile.projects.map((project, index) => (
              <div
                key={index}
                className="bento-card cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => trackLinkClick(project.url)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 rounded-lg text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-black text-white rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Vamos conversar?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Sinta-se à vontade para entrar em contato para discutir projetos,
            oportunidades ou apenas para trocar uma ideia.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => trackLinkClick('mailto:' + mockProfile.links.find(l => l.platform === 'Email')?.username)}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Enviar email
            </button>
            <button
              onClick={shareProfile}
              className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
            >
              Compartilhar perfil
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm mb-2">
            Criado com ❤️ usando{' '}
            <Link to="/" className="text-black hover:underline">
              Pocky
            </Link>
          </p>
          <p className="text-xs">
            © 2024 {mockProfile.displayName}. Todos os direitos reservados.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PublicProfilePage;