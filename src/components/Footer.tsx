import React from 'react';
import { Calculator, Heart, Globe } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-2 transition-colors">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white dark:text-gray-100">
                Math<span className="text-yellow-400 dark:text-blue-400">Work</span>
              </h3>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white dark:text-gray-200 font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab('videos')}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors text-left"
                >
                  Vídeos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 mb-2">Feito por Natan</p>
          <p className="text-gray-500 dark:text-gray-600 text-sm">
            © 2025 MathWork. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;