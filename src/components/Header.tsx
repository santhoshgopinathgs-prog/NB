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

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '50%', 
          background: userRole === 'teacher' ? '#2563EB' : (userRole === 'principal' ? '#0F172A' : 'var(--accent-blue)'), display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: '1.4rem',
          overflow: 'hidden', boxShadow: 'var(--shadow-sm)'
        }}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            userRole === 'teacher' ? '👩‍🏫' : (userRole === 'principal' ? '🏛️' : user?.name.charAt(0).toUpperCase())
          )}
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{getSalutation()},</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
            {userRole === 'teacher' ? 'Mrs. Suma' : (userRole === 'principal' ? 'Dr. Ramesh Kumar' : (user?.name ? capitalize(user.name.split(' ')[0]) : 'Learner'))} <span style={{fontSize: '1.2rem'}}>👋</span>
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        
        {/* Role Switcher Pill */}
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value as any)}
          style={{
            background: userRole === 'teacher' ? '#2563EB' : (userRole === 'principal' ? '#0F172A' : '#10B981'),
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          <option value="student">🎓 Student View</option>
          <option value="teacher">👩‍🏫 Teacher View</option>
          <option value="principal">🏛️ Principal View</option>
        </select>

        {isOffline && (
          <div style={{ background: 'var(--accent-red)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
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
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <span style={{ padding: '4px 8px', borderRadius: '18px', background: language === 'EN' ? 'var(--accent-green)' : 'transparent', color: language === 'EN' ? '#FFFFFF' : 'var(--text-secondary)' }}>EN</span>
          <span style={{ padding: '4px 8px', borderRadius: '18px', background: language === 'KN' ? 'var(--accent-green)' : 'transparent', color: language === 'KN' ? '#FFFFFF' : 'var(--text-secondary)' }}>KN</span>
        </button>

        {/* Streak */}
        <button 
          onClick={() => setActiveTab('achievements')}
          className="header-pill"
          style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255, 200, 87, 0.2)', border: '1px solid rgba(255, 200, 87, 0.4)', padding: '6px 10px', borderRadius: '24px', color: '#D97706', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          <Flame size={18} fill="#D97706" color="#D97706" /> {user?.streak || 0}
        </button>
        
        {/* XP / Coins */}
        <button 
          onClick={() => setActiveTab('achievements')}
          className="header-pill"
          style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255, 200, 87, 0.2)', border: '1px solid rgba(255, 200, 87, 0.4)', padding: '6px 10px', borderRadius: '24px', color: '#D97706', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          <Coins size={18} fill="#FFC857" color="#FFC857" /> {userXP}
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
