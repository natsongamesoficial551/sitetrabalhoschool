import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica se há preferência salva no localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    
    // Se não há preferência salva, usa a preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Salva a preferência no localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Adiciona/remove a classe 'dark' no elemento html
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
};