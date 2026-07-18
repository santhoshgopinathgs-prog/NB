import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trophy, Medal } from 'lucide-react';

export const TopTab = () => {
  const { t } = useAppContext();
  const [filter, setFilter] = useState<'regional' | 'overall'>('regional');

  const leaderboard = [
    { rank: 1, name: 'Rahul D.', xp: 3450, region: 'Bengaluru' },
    { rank: 2, name: 'Kavya S.', xp: 3100, region: 'Mysuru' },
    { rank: 3, name: 'Ananya S.', xp: 1250, region: 'Bengaluru', isMe: true },
    { rank: 4, name: 'Vivek M.', xp: 1100, region: 'Hubli' },
  ];

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 20px' }}>
        <Trophy color="var(--accent-orange)" />
        <h2 style={{ fontSize: '1.5rem' }}>{t('leaderboard')}</h2>
      </div>

      <div style={{ margin: '0 20px', display: 'flex', gap: '10px', background: 'var(--bg-app)', padding: '6px', borderRadius: '24px', border: '1px solid var(--border-light)' }}>
        <button 
          onClick={() => setFilter('regional')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'regional' ? 'white' : 'transparent', color: filter === 'regional' ? 'var(--accent-blue)' : 'var(--text-tertiary)', fontWeight: filter === 'regional' ? 700 : 500, boxShadow: filter === 'regional' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none' }}
        >
          Regional
        </button>
        <button 
          onClick={() => setFilter('overall')}
          style={{ flex: 1, padding: '10px', borderRadius: '20px', background: filter === 'overall' ? 'white' : 'transparent', color: filter === 'overall' ? 'var(--accent-blue)' : 'var(--text-tertiary)', fontWeight: filter === 'overall' ? 700 : 500, boxShadow: filter === 'overall' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none' }}
        >
          Overall (KA)
        </button>
      </div>

      <div className="card" style={{ padding: '8px', margin: '0 20px' }}>
        {leaderboard.map((user) => (
          <div key={user.rank} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '12px 16px', 
            borderRadius: '16px',
            background: user.isMe ? 'var(--bg-app)' : 'transparent',
            borderLeft: user.isMe ? '4px solid var(--accent-blue)' : '4px solid transparent'
          }}>
            <div style={{ width: '30px', fontWeight: 700, color: user.rank <= 3 ? 'var(--accent-orange)' : 'var(--text-tertiary)' }}>
              #{user.rank}
            </div>
            {user.rank <= 3 ? <Medal size={20} color="var(--accent-orange)" /> : <div style={{ width: '20px' }}></div>}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name} {user.isMe && <span style={{color: 'var(--accent-blue)', fontSize: '0.8rem'}}>(You)</span>}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{user.region}</div>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>{user.xp} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
};
