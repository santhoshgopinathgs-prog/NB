import React from 'react';
import { Trophy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const LeaderboardPortal = ({ onClose }: { onClose: () => void }) => {
  const { userXP, language, user } = useAppContext();

  const mockUsers = [
    { name: 'Arjun K.', xp: 4500, avatar: 'A' },
    { name: 'Priya R.', xp: 4120, avatar: 'P' },
    { name: 'Karthik S.', xp: 3950, avatar: 'K' },
    { name: 'Megha V.', xp: 3800, avatar: 'M' },
    { name: 'Sneha T.', xp: 3200, avatar: 'S' },
  ];

  // Insert current user and sort
  const allUsers: any[] = [...mockUsers, { name: user?.phone?.slice(-4) || 'You', xp: userXP, avatar: 'Me', isCurrent: true }];
  allUsers.sort((a, b) => b.xp - a.xp);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-app)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', fontSize: '1.5rem' }}>
          ←
        </button>
        <h2 style={{ fontSize: '1.4rem' }}>{language === 'EN' ? 'Global Leaderboard' : 'ಜಾಗತಿಕ ಲೀಡರ್‌ಬೋರ್ಡ್'}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--accent-orange), #fcd34d)', borderRadius: '24px', padding: '32px 24px', color: 'white', textAlign: 'center', marginBottom: '32px', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' }}>
          <Trophy size={48} color="white" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Weekly Championship</h3>
          <p style={{ opacity: 0.9 }}>Top 3 players get a special badge!</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allUsers.map((u, i) => {
            const isTop3 = i < 3;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: u.isCurrent ? 'var(--accent-blue)' : 'white', padding: '16px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', color: u.isCurrent ? 'white' : 'var(--text-primary)' }}>
                <div style={{ width: '30px', fontWeight: 700, fontSize: '1.2rem', textAlign: 'center', color: u.isCurrent ? 'white' : 'var(--text-tertiary)' }}>
                  #{i + 1}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: u.isCurrent ? 'rgba(255,255,255,0.2)' : 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                  {u.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{u.name} {u.isCurrent && '(You)'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isTop3 && <Trophy size={20} color={i === 0 ? '#FBBF24' : i === 1 ? '#9CA3AF' : '#D97706'} />}
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{u.xp} XP</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
