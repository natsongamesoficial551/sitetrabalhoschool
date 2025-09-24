import React from 'react';
import { BookOpen, Calculator, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`shadow-lg transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' 
        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700'
    }`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
              <div className={`relative rounded-full p-3 shadow-lg transition-colors ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <Calculator className={`w-8 h-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Math<span className={isDarkMode ? 'text-blue-400' : 'text-yellow-300'}>Work</span>
              </h1>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-blue-100'
              }`}>
                Plataforma de Aprendizado em Vídeo
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
              aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 text-white group-hover:text-blue-200 transition-colors" />
              )}
            </button>
            
            <div className={`flex items-center space-x-2 rounded-full px-4 py-2 ${
              isDarkMode ? 'bg-white/5' : 'bg-white/10'
            }`}>
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Aprenda com Excelência</span>
            </div>
          </div>
          
          {/* Botão do modo escuro para mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
              aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;