import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import NewsTicker from '@/components/NewsTicker';
import DashboardGrid from '@/components/DashboardGrid';
import bgImage from '@/assets/bg-amera.jpg';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleOpenChat = () => {
    window.open('https://tlk.io/amera-team', '_blank');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,30,0.3), rgba(0,0,30,0.3)), url(${bgImage})` 
      }}
    >
      <Header 
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenChat={handleOpenChat}
      />
      <NewsTicker />
      <main className="relative">
        <DashboardGrid />
      </main>
    </div>
  );
};

export default Index;
