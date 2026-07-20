import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trophy, Medal } from 'lucide-react';

export const TopTab = () => {
  const { t, language, user, leaderboard } = useAppContext();
  const [filter, setFilter] = useState<'regional' | 'overall'>('regional');

  const displayLeaderboard = leaderboard.map((u, index) => ({
    rank: index + 1,
    name: u.name,
    xp: u.xp,
    region: language === 'EN' ? 'Karnataka' : 'ಕರ್ನಾಟಕ',
    isMe: u.id === user?.id
  }));

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 20px' }}>
        <Trophy color="var(--accent-orange)" />
        <h2 style={{ fontSize: '1.5rem' }}>{t('leaderboard')}</h2>
      </div>

      <div style={{ margin: '0 20px', display: 'flex', gap: '10px', background: '#FFFFFF', padding: '6px', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(31, 41, 55, 0.04)' }}>
        <button 
          onClick={() => setFilter('regional')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'regional' ? '#2E8B57' : 'transparent', color: filter === 'regional' ? '#FFFFFF' : '#6B7280', fontWeight: 800, boxShadow: filter === 'regional' ? '0 4px 12px rgba(46, 139, 87, 0.3)' : 'none' }}
        >
          Regional
        </button>
        <button 
          onClick={() => setFilter('overall')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'overall' ? '#2E8B57' : 'transparent', color: filter === 'overall' ? '#FFFFFF' : '#6B7280', fontWeight: 800, boxShadow: filter === 'overall' ? '0 4px 12px rgba(46, 139, 87, 0.3)' : 'none' }}
        >
          Overall (KA)
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', height: '180px', marginTop: '20px' }}>
        {/* Second Place */}
        {displayLeaderboard[1] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.2s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #4DA8FF, #2563EB)', border: '3px solid #60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                {displayLeaderboard[1].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#4DA8FF', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>2</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: '#1F2937' }}>{displayLeaderboard[1].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 800 }}>{displayLeaderboard[1].xp} XP</div>
            <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom, #60A5FA, #2563EB)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #EFF6FF', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.4)' }}></div>
          </div>
        )}

        {/* First Place */}
        {displayLeaderboard[0] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.4s', width: '35%', zIndex: 10 }}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)' }}>👑</div>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFC857, #EAB308)', border: '4px solid #FDE047', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: '#854D0E', boxShadow: '0 6px 15px rgba(234, 179, 8, 0.4)' }}>
                {displayLeaderboard[0].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#EAB308', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>1</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', textAlign: 'center', color: '#D97706' }}>{displayLeaderboard[0].name}</div>
            <div style={{ fontSize: '0.85rem', color: '#D97706', fontWeight: 900 }}>{displayLeaderboard[0].xp} XP</div>
            <div style={{ width: '100%', height: '90px', background: 'linear-gradient(to bottom, #FFC857, #EAB308)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #FEF9C3', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.4)' }}></div>
          </div>
        )}

        {/* Third Place */}
        {displayLeaderboard[2] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', border: '3px solid #C4B5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                {displayLeaderboard[2].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#7C3AED', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>3</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: '#1F2937' }}>{displayLeaderboard[2].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#7C3AED', fontWeight: 800 }}>{displayLeaderboard[2].xp} XP</div>
            <div style={{ width: '100%', height: '40px', background: 'linear-gradient(to bottom, #C4B5FD, #7C3AED)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #F5F3FF', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.4)' }}></div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '8px', margin: '0 20px 20px 20px', background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        {displayLeaderboard.length > 3 ? displayLeaderboard.slice(3).map((user) => (
          <div key={user.rank} className="animate-slide-up" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '12px 16px', 
            borderRadius: '16px',
            background: user.isMe ? '#D1FAE5' : 'transparent',
            borderLeft: user.isMe ? '4px solid #2E8B57' : '4px solid transparent',
            animationDelay: `${(user.rank) * 0.05}s`,
            animationFillMode: 'both'
          }}>
            <div style={{ width: '30px', fontWeight: 800, color: '#9CA3AF', fontSize: '0.9rem' }}>
              #{user.rank}
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F8FAFC', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#2E8B57' }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#1F2937' }}>
                {user.name} {user.isMe && <span style={{color: '#FFFFFF', fontSize: '0.75rem', background: '#2E8B57', padding: '2px 8px', borderRadius: '8px', marginLeft: '6px', fontWeight: 800}}>YOU</span>}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{user.region}</div>
            </div>
            <div style={{ fontWeight: 800, color: '#2E8B57', fontSize: '0.9rem' }}>{user.xp} XP</div>
          </div>
        )) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF' }}>
            {displayLeaderboard.length === 0 ? (language === 'EN' ? 'No one is on the leaderboard yet!' : 'ಯಾರೂ ಲೀಡರ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿಲ್ಲ!') : ''}
          </div>
        )}
      </div>
    </div>
  );
};
