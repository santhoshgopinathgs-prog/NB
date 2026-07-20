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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'var(--accent-blue)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '1.2rem',
          overflow: 'hidden'
        }}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            user?.name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{getSalutation()},</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            {user?.name ? capitalize(user.name.split(' ')[0]) : ''} <span style={{fontSize: '1rem'}}>👋</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        
        {isOffline && (
          <div style={{ background: 'var(--accent-red)', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 700 }}>
            Offline
          </div>
        )}

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          style={{ 
            background: '#FFFFFF', 
            border: '1px solid #D8CFBE',
            borderRadius: '20px',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.65rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <span style={{ padding: '4px 8px', borderRadius: '16px', background: language === 'EN' ? '#4A6FA5' : 'transparent', color: language === 'EN' ? '#FFFFFF' : '#5C6479' }}>EN</span>
          <span style={{ padding: '4px 8px', borderRadius: '16px', background: language === 'KN' ? '#4A6FA5' : 'transparent', color: language === 'KN' ? '#FFFFFF' : '#5C6479' }}>KN</span>
        </button>

        {/* Streak */}
        <button 
          onClick={() => setActiveTab('achievements')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FFF3E8', border: '1px solid #F8D7BE', padding: '6px 12px', borderRadius: '20px', color: '#E76F51', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
        >
          <Flame size={15} fill="#E76F51" color="#E76F51" /> {user?.streak || 0}
        </button>
        
        {/* XP / Coins */}
        <button 
          onClick={() => setActiveTab('achievements')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FFF3E8', border: '1px solid #F8D7BE', padding: '6px 12px', borderRadius: '20px', color: '#F4A261', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
        >
          <Coins size={15} fill="#F4A261" color="#F4A261" /> {userXP}
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
            <Bell size={20} color="var(--text-tertiary)" />
            {hasUnread && <div style={{ position: 'absolute', top: -2, right: -2, width: '10px', height: '10px', background: 'var(--accent-red)', borderRadius: '50%', border: '2px solid white' }}></div>}
          </button>

          {showNotifications && (
            <NotificationsMenu onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>
    </header>
  );
};
