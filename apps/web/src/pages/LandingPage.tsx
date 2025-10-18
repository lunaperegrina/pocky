import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-xl">Pocky</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Entrar
          </Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Criar conta
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <SparklesIcon className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Seu perfil em bento style</span>
          </div>

          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Crie seu perfil
            <br />
            <span className="text-gray-600">em bento boxes</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Centralize todos os seus links sociais em uma página elegante inspirada no design da Apple.
            Simples, bonito e profissional.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="btn-primary flex items-center gap-2">
              Começar agora
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              to="/demo"
              className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Ver exemplo
            </Link>
          </div>
        </div>

        {/* Bento Demo */}
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
          {/* Large card */}
          <div className="col-span-2 row-span-2 bento-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-gray-600">@johndoe</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="bento-card flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">in</span>
            </div>
            <span className="text-sm">LinkedIn</span>
          </div>

          <div className="bento-card flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GH</span>
            </div>
            <span className="text-sm">GitHub</span>
          </div>

          <div className="bento-card flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <span className="text-sky-600 font-bold text-sm">X</span>
            </div>
            <span className="text-sm">Twitter</span>
          </div>

          <div className="col-span-3 bento-card">
            <h4 className="font-semibold mb-2">🚀 Projetos em Destaque</h4>
            <p className="text-gray-600 text-sm mb-3">
              Confira meus projetos open source e contribuições
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">TypeScript</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Node.js</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white">✨</span>
            </div>
            <h3 className="font-semibold mb-2">Design Bento</h3>
            <p className="text-gray-600 text-sm">
              Layout inspirado no design da Apple com bento boxes organizados
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white">🔗</span>
            </div>
            <h3 className="font-semibold mb-2">Links Inteligentes</h3>
            <p className="text-gray-600 text-sm">
              Adicione suas redes sociais e nós buscamos as informações automaticamente
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">
              Acompanhe quantas pessoas clicam nos seus links
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-black text-white rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para criar seu perfil?
          </h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Junte-se a milhares de pessoas que já criaram seus perfis
            profissionais com Pocky.
          </p>
          <Link to="/register" className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            Criar meu perfil grátis
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;