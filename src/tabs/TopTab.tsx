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

      <div style={{ margin: '0 20px', display: 'flex', gap: '10px', background: '#FFFFFF', padding: '6px', borderRadius: '24px', border: '1px solid #D8CFBE', boxShadow: '0 4px 12px rgba(45, 49, 66, 0.05)' }}>
        <button 
          onClick={() => setFilter('regional')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'regional' ? '#4A6FA5' : 'transparent', color: filter === 'regional' ? '#FFFFFF' : '#5C6479', fontWeight: 800, boxShadow: filter === 'regional' ? '0 4px 12px rgba(74, 111, 165, 0.3)' : 'none' }}
        >
          Regional
        </button>
        <button 
          onClick={() => setFilter('overall')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'overall' ? '#4A6FA5' : 'transparent', color: filter === 'overall' ? '#FFFFFF' : '#5C6479', fontWeight: 800, boxShadow: filter === 'overall' ? '0 4px 12px rgba(74, 111, 165, 0.3)' : 'none' }}
        >
          Overall (KA)
        </button>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', height: '180px', marginTop: '20px' }}>
        {/* Second Place */}
        {displayLeaderboard[1] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.2s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #4A6FA5, #3B5985)', border: '3px solid #6C8EBF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                {displayLeaderboard[1].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#4A6FA5', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>2</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: '#2D3142' }}>{displayLeaderboard[1].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#4A6FA5', fontWeight: 800 }}>{displayLeaderboard[1].xp} XP</div>
            <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom, #6C8EBF, #4A6FA5)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #EBF1F9', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.4)' }}></div>
          </div>
        )}

        {/* First Place */}
        {displayLeaderboard[0] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0.4s', width: '35%', zIndex: 10 }}>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)' }}>👑</div>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #F4A261, #E76F51)', border: '4px solid #F8C291', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'white', boxShadow: '0 6px 15px rgba(244, 162, 97, 0.4)' }}>
                {displayLeaderboard[0].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#E76F51', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>1</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', textAlign: 'center', color: '#E76F51' }}>{displayLeaderboard[0].name}</div>
            <div style={{ fontSize: '0.85rem', color: '#F4A261', fontWeight: 900 }}>{displayLeaderboard[0].xp} XP</div>
            <div style={{ width: '100%', height: '90px', background: 'linear-gradient(to bottom, #F4A261, #E76F51)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #FDF0E6', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.4)' }}></div>
          </div>
        )}

        {/* Third Place */}
        {displayLeaderboard[2] && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animationDelay: '0s', width: '30%' }}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #C4A482, #9E8262)', border: '3px solid #D8C3AC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                {displayLeaderboard[2].name.charAt(0)}
              </div>
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#9E8262', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'white', border: '2px solid white' }}>3</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', color: '#2D3142' }}>{displayLeaderboard[2].name}</div>
            <div style={{ fontSize: '0.8rem', color: '#9E8262', fontWeight: 800 }}>{displayLeaderboard[2].xp} XP</div>
            <div style={{ width: '100%', height: '40px', background: 'linear-gradient(to bottom, #D8C3AC, #9E8262)', borderRadius: '12px 12px 0 0', marginTop: '8px', borderTop: '4px solid #F7F3EE', boxShadow: 'inset 0 10px 10px rgba(255,255,255,0.4)' }}></div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '8px', margin: '0 20px 20px 20px', background: '#FFFFFF', border: '1px solid #D8CFBE' }}>
        {displayLeaderboard.length > 3 ? displayLeaderboard.slice(3).map((user) => (
          <div key={user.rank} className="animate-slide-up" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '12px 16px', 
            borderRadius: '16px',
            background: user.isMe ? '#EBF1F9' : 'transparent',
            borderLeft: user.isMe ? '4px solid #4A6FA5' : '4px solid transparent',
            animationDelay: `${(user.rank) * 0.05}s`,
            animationFillMode: 'both'
          }}>
            <div style={{ width: '30px', fontWeight: 800, color: '#8C94A6', fontSize: '0.9rem' }}>
              #{user.rank}
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EDE6DB', border: '1px solid #D8CFBE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4A6FA5' }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#2D3142' }}>
                {user.name} {user.isMe && <span style={{color: '#FFFFFF', fontSize: '0.75rem', background: '#4A6FA5', padding: '2px 8px', borderRadius: '8px', marginLeft: '6px', fontWeight: 800}}>YOU</span>}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#5C6479' }}>{user.region}</div>
            </div>
            <div style={{ fontWeight: 800, color: '#4A6FA5', fontSize: '0.9rem' }}>{user.xp} XP</div>
          </div>
        )) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#8C94A6' }}>
            {displayLeaderboard.length === 0 ? (language === 'EN' ? 'No one is on the leaderboard yet!' : 'ಯಾರೂ ಲೀಡರ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿಲ್ಲ!') : ''}
          </div>
        )}
      </div>
    </div>
  );
};
