import React from 'react';
import { Trophy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const LeaderboardPortal = ({ onClose }: { onClose: () => void }) => {
  const { userXP, language, user, leaderboard } = useAppContext();

  const allUsers = leaderboard.map(u => ({
    ...u,
    isCurrent: u.id === user?.id
  }));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#120F0D', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: '#1B1714', borderBottom: '1px solid #332B24' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', fontSize: '1.5rem', color: '#FFFFFF' }}>
          ←
        </button>
        <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>{language === 'EN' ? 'Global Leaderboard' : 'ಜಾಗತಿಕ ಲೀಡರ್‌ಬೋರ್ಡ್'}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #fef08a, #eab308)', borderRadius: '24px', padding: '28px 24px', color: '#713f12', textAlign: 'center', marginBottom: '32px', boxShadow: '0 10px 25px rgba(234, 179, 8, 0.3)' }}>
          <Trophy size={48} color="#713f12" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '6px' }}>Weekly Championship</h3>
          <p style={{ fontWeight: 700, opacity: 0.9 }}>Top 3 players get a special badge!</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allUsers.map((u, i) => {
            const isTop3 = i < 3;
            return (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', gap: '16px', 
                background: u.isCurrent ? '#362E27' : '#231E19', 
                border: u.isCurrent ? '2px solid #FEF08A' : '1px solid #332B24',
                padding: '16px', borderRadius: '20px', color: '#FFFFFF' 
              }}>
                <div style={{ width: '30px', fontWeight: 800, fontSize: '1.1rem', textAlign: 'center', color: '#A69685' }}>
                  #{i + 1}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#120F0D', border: '1px solid #332B24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', color: '#FEF08A' }}>
                  {u.avatar || u.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF' }}>
                    {u.name} {u.isCurrent && <span style={{ background: '#FEF08A', color: '#161310', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '8px', marginLeft: '6px', fontWeight: 900 }}>YOU</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isTop3 && <Trophy size={20} color={i === 0 ? '#FBBF24' : i === 1 ? '#9CA3AF' : '#D97706'} />}
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#FEF08A' }}>{u.xp} XP</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
