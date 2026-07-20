import React from 'react';
import { Home, BookOpen, Gamepad2, Trophy, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const { t } = useAppContext();
  
  const tabs = [
    { id: 'home', icon: Home, label: t('home'), color: '#ef4444' }, // Red
    { id: 'learn', icon: BookOpen, label: t('learn'), color: '#10b981' }, // Green
    { id: 'practice', icon: Gamepad2, label: t('practice'), color: '#8b5cf6' }, // Purple
    { id: 'top', icon: Trophy, label: t('top'), color: '#f59e0b' }, // Yellow/Orange
    { id: 'profile', icon: User, label: t('profile'), color: '#3b82f6' } // Blue
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
                color={isActive ? '#181412' : '#A69685'}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
