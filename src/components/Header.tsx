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
  const [hasUnread, setHasUnread] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getSalutation = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '50%', 
          background: 'var(--accent-blue)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: '1.4rem',
          overflow: 'hidden', boxShadow: 'var(--shadow-sm)'
        }}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            user?.name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{getSalutation()},</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
            {user?.name ? capitalize(user.name.split(' ')[0]) : ''} <span style={{fontSize: '1.2rem'}}>👋</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        
        {isOffline && (
          <div style={{ background: 'var(--accent-red)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
            Offline
          </div>
        )}

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          style={{ 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <span style={{ padding: '6px 12px', borderRadius: '20px', background: language === 'EN' ? 'var(--accent-green)' : 'transparent', color: language === 'EN' ? '#FFFFFF' : 'var(--text-secondary)' }}>EN</span>
          <span style={{ padding: '6px 12px', borderRadius: '20px', background: language === 'KN' ? 'var(--accent-green)' : 'transparent', color: language === 'KN' ? '#FFFFFF' : 'var(--text-secondary)' }}>KN</span>
        </button>

        {/* Streak */}
        <button 
          onClick={() => setActiveTab('achievements')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 200, 87, 0.2)', border: '1px solid rgba(255, 200, 87, 0.4)', padding: '8px 14px', borderRadius: '24px', color: '#D97706', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
        >
          <Flame size={20} fill="#D97706" color="#D97706" /> {user?.streak || 0}
        </button>
        
        {/* XP / Coins */}
        <button 
          onClick={() => setActiveTab('achievements')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 200, 87, 0.2)', border: '1px solid rgba(255, 200, 87, 0.4)', padding: '8px 14px', borderRadius: '24px', color: '#D97706', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
        >
          <Coins size={20} fill="#FFC857" color="#FFC857" /> {userXP}
        </button>

        {/* Bell & Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setHasUnread(false);
            }}
            style={{ position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
          >
            <Bell size={24} color="var(--text-primary)" />
            {hasUnread && <div style={{ position: 'absolute', top: -2, right: -2, width: '12px', height: '12px', background: 'var(--accent-red)', borderRadius: '50%', border: '2px solid white' }}></div>}
          </button>

          {showNotifications && (
            <NotificationsMenu onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>
    </header>
  );
};
