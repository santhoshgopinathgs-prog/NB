import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trophy, Medal } from 'lucide-react';
import { formatCapitalizedName } from '../utils/formatName';

export const TopTab = () => {
  const { t, language, user, leaderboard } = useAppContext();
  const [filter, setFilter] = useState<'regional' | 'overall'>('regional');

  const displayLeaderboard = leaderboard.map((u, index) => ({
    rank: index + 1,
    name: formatCapitalizedName(u.name),
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

      <div style={{ margin: '0 20px', display: 'flex', gap: '10px', background: 'var(--bg-surface)', padding: '6px', borderRadius: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
        <button 
          onClick={() => setFilter('regional')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'regional' ? 'var(--accent-green)' : 'transparent', color: filter === 'regional' ? '#FFFFFF' : 'var(--text-secondary)', fontWeight: 800, boxShadow: filter === 'regional' ? '0 4px 14px rgba(46, 139, 87, 0.4)' : 'none' }}
        >
          Regional
        </button>
        <button 
          onClick={() => setFilter('overall')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'overall' ? 'var(--accent-green)' : 'transparent', color: filter === 'overall' ? '#FFFFFF' : 'var(--text-secondary)', fontWeight: 800, boxShadow: filter === 'overall' ? '0 4px 14px rgba(46, 139, 87, 0.4)' : 'none' }}
        >
          Overall (KA)
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', height: '180px', marginTop: '20px' }}>
        {/* Second Place - Cyan */}
        {displayLeaderboard[1] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.2s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #38BDF8, #0284C7)', border: '3px solid #7DD3FC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white', boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)' }}>
                {displayLeaderboard[1].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#0284C7', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>2</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: 'var(--text-primary)' }}>{displayLeaderboard[1].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 800 }}>{displayLeaderboard[1].xp} XP</div>
            <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom, #38BDF8, #0284C7)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid rgba(255,255,255,0.4)', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.3)' }}></div>
          </div>
        )}

        {/* First Place - Gold */}
        {displayLeaderboard[0] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.4s', width: '35%', zIndex: 10 }}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)' }}>👑</div>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #FBBF24, #F59E0B)', border: '4px solid #FDE68A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: '#78350F', boxShadow: '0 6px 18px rgba(245, 158, 11, 0.45)' }}>
                {displayLeaderboard[0].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#D97706', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>1</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', textAlign: 'center', color: 'var(--accent-orange)' }}>{displayLeaderboard[0].name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: 900 }}>{displayLeaderboard[0].xp} XP</div>
            <div style={{ width: '100%', height: '90px', background: 'linear-gradient(to bottom, #FBBF24, #F59E0B)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid rgba(255,255,255,0.5)', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.3)' }}></div>
          </div>
        )}

        {/* Third Place - Purple */}
        {displayLeaderboard[2] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #C084FC, #7C3AED)', border: '3px solid #E9D5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)' }}>
                {displayLeaderboard[2].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#7C3AED', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>3</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: 'var(--text-primary)' }}>{displayLeaderboard[2].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#C084FC', fontWeight: 800 }}>{displayLeaderboard[2].xp} XP</div>
            <div style={{ width: '100%', height: '40px', background: 'linear-gradient(to bottom, #C084FC, #7C3AED)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid rgba(255,255,255,0.3)', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.3)' }}></div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '8px', margin: '0 20px 20px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
        {displayLeaderboard.length > 3 ? displayLeaderboard.slice(3).map((user) => (
          <div key={user.rank} className="animate-slide-up" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '12px 16px', 
            borderRadius: '16px',
            background: user.isMe ? 'rgba(46, 139, 87, 0.15)' : 'transparent',
            borderLeft: user.isMe ? '4px solid var(--accent-green)' : '4px solid transparent',
            animationDelay: `${(user.rank) * 0.05}s`,
            animationFillMode: 'both'
          }}>
            <div style={{ width: '30px', fontWeight: 800, color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              #{user.rank}
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-input)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent-green)' }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                {user.name} {user.isMe && <span style={{color: '#FFFFFF', fontSize: '0.75rem', background: 'var(--accent-green)', padding: '2px 8px', borderRadius: '8px', marginLeft: '6px', fontWeight: 800}}>YOU</span>}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.region}</div>
            </div>
            <div style={{ fontWeight: 800, color: 'var(--accent-green)', fontSize: '0.9rem' }}>{user.xp} XP</div>
          </div>
        )) : (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            {displayLeaderboard.length === 0 ? (language === 'EN' ? 'No one is on the leaderboard yet!' : 'ಯಾರೂ ಲೀಡರ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿಲ್ಲ!') : ''}
          </div>
        )}
      </div>
    </div>
  );
};
