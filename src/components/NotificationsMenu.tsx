import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, Flame, Trophy, Info } from 'lucide-react';

export const NotificationsMenu = ({ onClose }: { onClose: () => void }) => {
  const { language, user, certificates, userXP } = useAppContext();

  const notifications = [];

  // 1. Streak Notification
  if (user && user.streak > 0) {
    notifications.push({
      id: 'streak',
      icon: <Flame size={16} fill="#D97706" />,
      color: '#D97706',
      bg: '#FEF3C7',
      title: language === 'EN' ? `${user.streak} Day Streak!` : `${user.streak} ದಿನದ ಸ್ಟ್ರೀಕ್!`,
      message: language === 'EN' ? 'Keep up the great work and practice daily.' : 'ಉತ್ತಮ ಕೆಲಸವನ್ನು ಮುಂದುವರಿಸಿ ಮತ್ತು ಪ್ರತಿದಿನ ಅಭ್ಯಾಸ ಮಾಡಿ.'
    });
  } else {
    notifications.push({
      id: 'streak-missed',
      icon: <Flame size={16} color="#94A3B8" />,
      color: '#64748B',
      bg: '#F1F5F9',
      title: language === 'EN' ? 'Streak broken!' : 'ಸ್ಟ್ರೀಕ್ ಮುರಿಯಲಾಗಿದೆ!',
      message: language === 'EN' ? 'Practice today to start a new streak.' : 'ಹೊಸ ಸ್ಟ್ರೀಕ್ ಪ್ರಾರಂಭಿಸಲು ಇಂದು ಅಭ್ಯಾಸ ಮಾಡಿ.'
    });
  }

  // 2. Certificate Notification
  if (certificates.length > 0) {
    notifications.push({
      id: 'cert',
      icon: <CheckCircle size={16} />,
      color: '#16A34A',
      bg: '#DCFCE7',
      title: language === 'EN' ? 'New Certificate Earned!' : 'ಹೊಸ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಗಳಿಸಲಾಗಿದೆ!',
      message: language === 'EN' ? `You have earned ${certificates.length} certificate(s).` : `ನೀವು ${certificates.length} ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಗಳಿಸಿದ್ದೀರಿ.`
    });
  }

  // 3. Welcome / Progress Notification
  if (userXP === 0) {
    notifications.push({
      id: 'welcome',
      icon: <Info size={16} />,
      color: '#2563EB',
      bg: '#DBEAFE',
      title: language === 'EN' ? 'Welcome to Namma Buddy!' : 'ನಮ್ಮ ಬಡ್ಡಿಗೆ ಸ್ವಾಗತ!',
      message: language === 'EN' ? 'Start learning to earn XP and certificates.' : 'XP ಮತ್ತು ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಗಳಿಸಲು ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ.'
    });
  } else if (userXP > 0 && certificates.length === 0) {
    notifications.push({
      id: 'progress',
      icon: <Trophy size={16} />,
      color: '#8B5CF6',
      bg: '#EDE9FE',
      title: language === 'EN' ? 'Great Progress!' : 'ಉತ್ತಮ ಪ್ರಗತಿ!',
      message: language === 'EN' ? `You have earned ${userXP} XP so far.` : `ನೀವು ಇಲ್ಲಿಯವರೆಗೆ ${userXP} XP ಗಳಿಸಿದ್ದೀರಿ.`
    });
  }

  return (
    <>
      <div 
        style={{ position: 'fixed', inset: 0, zIndex: 99 }} 
        onClick={onClose}
      ></div>
      <div style={{ 
        position: 'absolute', top: '32px', right: 0, width: '280px', 
        background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', 
        border: '1px solid var(--border-light)', zIndex: 100, overflow: 'hidden', textAlign: 'left'
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-light)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          {language === 'EN' ? 'Notifications' : 'ಅಧಿಸೂಚನೆಗಳು'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map((notif, index) => (
            <div key={notif.id} className="animate-slide-up" style={{ padding: '16px', borderBottom: index < notifications.length - 1 ? '1px solid var(--border-light)' : 'none', display: 'flex', gap: '12px', background: index === 0 ? '#F8FAFC' : 'white', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#F1F5F9'} onMouseOut={(e) => e.currentTarget.style.background = index === 0 ? '#F8FAFC' : 'white'}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: notif.bg, color: notif.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {notif.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {notif.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {notif.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
