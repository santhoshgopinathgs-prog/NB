import React, { useState } from 'react';
import { Flame, Coins, Bell, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { NotificationsMenu } from './NotificationsMenu';

interface HeaderProps {
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ setActiveTab }) => {
  const { t, language, toggleLanguage, user, userXP } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'var(--accent-blue)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '1.2rem'
        }}>
          {user?.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{t('goodEvening')},</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            {user?.name.split(' ')[0]} <span style={{fontSize: '1rem'}}>👋</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          style={{ 
            background: 'var(--bg-app)', 
            border: '1px solid var(--border-light)',
            borderRadius: '20px',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.65rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          <span style={{ padding: '4px 8px', borderRadius: '16px', background: language === 'EN' ? 'white' : 'transparent', boxShadow: language === 'EN' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none' }}>EN</span>
          <span style={{ padding: '4px 8px', borderRadius: '16px', background: language === 'KN' ? 'white' : 'transparent', boxShadow: language === 'KN' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none' }}>KN</span>
        </button>

        {/* Streak */}
        <button 
          onClick={() => setActiveTab('achievements')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', padding: '6px 12px', borderRadius: '20px', color: '#D97706', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', border: 'none' }}
        >
          <Flame size={14} fill="#D97706" color="#D97706" /> {user?.streak || 0}
        </button>
        
        {/* XP / Coins */}
        <button 
          onClick={() => setActiveTab('achievements')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FEF3C7', padding: '6px 12px', borderRadius: '20px', color: '#D97706', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', border: 'none' }}
        >
          <Coins size={14} fill="#F59E0B" color="#F59E0B" /> {userXP}
        </button>

        {/* Bell & Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
          >
            <Bell size={20} color="var(--text-tertiary)" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: '10px', height: '10px', background: 'var(--accent-red)', borderRadius: '50%', border: '2px solid white' }}></div>
          </button>

          {showNotifications && (
            <NotificationsMenu onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>
    </header>
  );
};
