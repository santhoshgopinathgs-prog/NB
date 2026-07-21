import React, { useState } from 'react';
import { Flame, Coins, Bell, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { NotificationsMenu } from './NotificationsMenu';

interface HeaderProps {
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ setActiveTab }) => {
  const { t, language, toggleLanguage, user, userXP, userRole, setUserRole } = useAppContext();
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

  const getAvatarLetter = () => {
    if (user?.name && user.name.trim().length > 0) {
      return user.name.trim().charAt(0).toUpperCase();
    }
    if (userRole === 'teacher') return 'T';
    if (userRole === 'principal') return 'P';
    return 'S';
  };

  const getUserDisplayName = () => {
    if (user?.name && user.name.trim().length > 0) {
      return user.name;
    }
    if (userRole === 'teacher') return 'Teacher';
    if (userRole === 'principal') return 'Principal';
    return 'Learner';
  };

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="header-avatar" style={{ 
          width: '44px', height: '44px', borderRadius: '50%', 
          background: userRole === 'teacher' ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : (userRole === 'principal' ? 'linear-gradient(135deg, #0F172A, #1E293B)' : 'var(--accent-blue)'), 
          display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 900, fontSize: '1.3rem',
          overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          border: '2px solid rgba(255,255,255,0.8)',
          flexShrink: 0
        }}>
          {userRole === 'student' && user?.avatar ? (
            <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>{getAvatarLetter()}</span>
          )}
        </div>
        <div className="header-user-greeting">
          <div className="header-salutation" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{getSalutation()},</div>
          <div className="header-user-name" style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)' }}>
            {getUserDisplayName()} <span style={{fontSize: '1.1rem'}}>👋</span>
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        
        {/* Active Role Badge */}
        <div className="header-role-badge" style={{
          background: userRole === 'teacher' ? '#2563EB' : (userRole === 'principal' ? '#0F172A' : '#10B981'),
          color: 'white',
          borderRadius: '20px',
          padding: '6px 12px',
          fontSize: '0.8rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }}>
          {userRole === 'teacher' ? '👩‍🏫 Teacher' : (userRole === 'principal' ? '🏛️ Principal' : '🎓 Student')}
        </div>

        {isOffline && (
          <div style={{ background: 'var(--accent-red)', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 }}>
            Offline
          </div>
        )}

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="header-pill"
          style={{ 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <span style={{ padding: '4px 7px', borderRadius: '18px', background: language === 'EN' ? 'var(--accent-green)' : 'transparent', color: language === 'EN' ? '#FFFFFF' : 'var(--text-secondary)' }}>EN</span>
          <span style={{ padding: '4px 7px', borderRadius: '18px', background: language === 'KN' ? 'var(--accent-green)' : 'transparent', color: language === 'KN' ? '#FFFFFF' : 'var(--text-secondary)' }}>KN</span>
        </button>

        {/* Streak (Always prioritized & visible on mobile) */}
        <button 
          onClick={() => setActiveTab('achievements')}
          className="header-pill header-streak-pill"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 200, 87, 0.2)', border: '1px solid rgba(255, 200, 87, 0.4)', padding: '5px 9px', borderRadius: '24px', color: '#D97706', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <Flame size={16} fill="#D97706" color="#D97706" /> {user?.streak || 1}
        </button>
        
        {/* XP / Coins */}
        <button 
          onClick={() => setActiveTab('achievements')}
          className="header-pill header-coins-pill"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 200, 87, 0.2)', border: '1px solid rgba(255, 200, 87, 0.4)', padding: '5px 9px', borderRadius: '24px', color: '#D97706', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <Coins size={16} fill="#FFC857" color="#FFC857" /> {userXP}
        </button>

        {/* Bell & Notifications Dropdown */}
        <div className="header-bell-container" style={{ position: 'relative', flexShrink: 0 }}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setHasUnread(false);
            }}
            style={{ position: 'relative', background: 'none', border: 'none', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Notifications"
          >
            <Bell size={22} color="var(--text-primary)" />
            {hasUnread && <div style={{ position: 'absolute', top: 2, right: 2, width: '10px', height: '10px', background: 'var(--accent-red)', borderRadius: '50%', border: '2px solid white' }}></div>}
          </button>

          {showNotifications && (
            <NotificationsMenu onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>
    </header>
  );
};
