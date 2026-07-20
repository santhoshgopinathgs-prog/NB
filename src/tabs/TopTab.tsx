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

      <div style={{ margin: '0 20px', display: 'flex', gap: '10px', background: '#231E19', padding: '6px', borderRadius: '24px', border: '1px solid #332B24' }}>
        <button 
          onClick={() => setFilter('regional')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'regional' ? '#FEF08A' : 'transparent', color: filter === 'regional' ? '#161310' : '#A69685', fontWeight: 800, boxShadow: filter === 'regional' ? '0 2px 10px rgba(254, 240, 138, 0.3)' : 'none' }}
        >
          Regional
        </button>
        <button 
          onClick={() => setFilter('overall')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'overall' ? '#FEF08A' : 'transparent', color: filter === 'overall' ? '#161310' : '#A69685', fontWeight: 800, boxShadow: filter === 'overall' ? '0 2px 10px rgba(254, 240, 138, 0.3)' : 'none' }}
        >
          Overall (KA)
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', height: '180px', marginTop: '20px' }}>
        {/* Second Place */}
        {displayLeaderboard[1] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.2s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', border: '3px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                {displayLeaderboard[1].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#94a3b8', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid #1e293b' }}>2</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: '#FFFFFF' }}>{displayLeaderboard[1].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#FEF08A', fontWeight: 800 }}>{displayLeaderboard[1].xp} XP</div>
            <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom, #cbd5e1, #64748b)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #f8fafc', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.3)' }}></div>
          </div>
        )}

        {/* First Place */}
        {displayLeaderboard[0] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.4s', width: '35%', zIndex: 10 }}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)' }}>👑</div>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #fef08a, #eab308)', border: '4px solid #fde047', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: '#713f12', boxShadow: '0 6px 15px rgba(234, 179, 8, 0.5)' }}>
                {displayLeaderboard[0].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#eab308', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: 'white', border: '2px solid #713f12' }}>1</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', textAlign: 'center', color: '#FDE047' }}>{displayLeaderboard[0].name}</div>
            <div style={{ fontSize: '0.85rem', color: '#FEF08A', fontWeight: 900 }}>{displayLeaderboard[0].xp} XP</div>
            <div style={{ width: '100%', height: '90px', background: 'linear-gradient(to bottom, #fef08a, #eab308)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #fef9c3', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.4), 0 0 20px rgba(234,179,8,0.3)' }}></div>
          </div>
        )}

        {/* Third Place */}
        {displayLeaderboard[2] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffedd5, #fdba74)', border: '3px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: '#7c2d12', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                {displayLeaderboard[2].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#fdba74', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid #7c2d12' }}>3</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: '#FFFFFF' }}>{displayLeaderboard[2].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#FEF08A', fontWeight: 800 }}>{displayLeaderboard[2].xp} XP</div>
            <div style={{ width: '100%', height: '40px', background: 'linear-gradient(to bottom, #fdba74, #ea580c)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #fff7ed', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.3)' }}></div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '8px', margin: '0 20px 20px 20px', background: '#231E19', border: '1px solid #332B24' }}>
        {displayLeaderboard.length > 3 ? displayLeaderboard.slice(3).map((user) => (
          <div key={user.rank} className="animate-slide-up" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '12px 16px', 
            borderRadius: '16px',
            background: user.isMe ? '#362E27' : 'transparent',
            borderLeft: user.isMe ? '4px solid #FEF08A' : '4px solid transparent',
            animationDelay: `${(user.rank) * 0.05}s`,
            animationFillMode: 'both'
          }}>
            <div style={{ width: '30px', fontWeight: 800, color: '#A69685', fontSize: '0.9rem' }}>
              #{user.rank}
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#120F0D', border: '1px solid #332B24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#FEF08A' }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF' }}>
                {user.name} {user.isMe && <span style={{color: '#161310', fontSize: '0.75rem', background: '#FEF08A', padding: '2px 8px', borderRadius: '8px', marginLeft: '6px', fontWeight: 900}}>YOU</span>}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#A69685' }}>{user.region}</div>
            </div>
            <div style={{ fontWeight: 800, color: '#FEF08A', fontSize: '0.9rem' }}>{user.xp} XP</div>
          </div>
        )) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#A69685' }}>
            {displayLeaderboard.length === 0 ? (language === 'EN' ? 'No one is on the leaderboard yet!' : 'ಯಾರೂ ಲೀಡರ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿಲ್ಲ!') : ''}
          </div>
        )}
      </div>
    </div>
  );
};
