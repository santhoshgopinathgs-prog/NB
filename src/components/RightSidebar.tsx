import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Flame, Coins, Trophy, Award, CheckCircle2, ChevronRight, User } from 'lucide-react';

interface RightSidebarProps {
  setActiveTab: (tab: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ setActiveTab }) => {
  const { user, userXP, dailyQuests, language, leaderboard } = useAppContext();

  const activeQuestsCount = [dailyQuests.lessons >= 2, dailyQuests.quiz80, dailyQuests.aiTutor, dailyQuests.typing].filter(Boolean).length;
  const nextLevelXP = Math.ceil((userXP + 1) / 100) * 100;
  const levelProgress = Math.min(100, Math.round(((userXP % 100) / 100) * 100));

  return (
    <aside className="desktop-right-sidebar animate-slide-up">
      {/* User Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '18px' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={user?.avatar || '/avatar_boy.jpg'} 
              alt={user?.name} 
              style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-green)', boxShadow: 'var(--shadow-sm)' }}
            />
            <span style={{ position: 'absolute', bottom: -2, right: -2, background: 'var(--accent-green)', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '12px' }}>
              Cl {user?.class || 9}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Student'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.school || 'Namma Buddy School'}
            </p>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 700 }}>
              📍 Anekal, Bengaluru Rural
            </span>
          </div>
        </div>

        {/* Level & XP Progress Bar */}
        <div style={{ background: 'var(--bg-input)', padding: '14px 16px', borderRadius: '18px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-primary)' }}>Level {Math.floor(userXP / 100) + 1}</span>
            <span style={{ color: 'var(--accent-orange)' }}>{userXP} / {nextLevelXP} XP</span>
          </div>
          <div className="progress-track" style={{ height: '10px' }}>
            <div className="progress-fill" style={{ width: `${levelProgress}%`, background: 'linear-gradient(90deg, var(--accent-green), var(--accent-orange))' }}></div>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('profile')}
          style={{ width: '100%', padding: '12px', borderRadius: '16px', background: 'var(--bg-app)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <User size={18} /> {language === 'EN' ? 'View Full Profile' : 'ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ'}
        </button>
      </div>

      {/* Gamified Streak & Coins Widget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255, 200, 87, 0.15)', border: '1px solid rgba(255, 200, 87, 0.4)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={26} fill="#D97706" color="#D97706" />
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#D97706' }}>{user?.streak || 0} Days</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Daily Streak</div>
          </div>
        </div>

        <div className="card" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(77, 168, 255, 0.15)', border: '1px solid rgba(77, 168, 255, 0.4)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coins size={26} fill="#0284C7" color="#0284C7" />
          </div>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0284C7' }}>{userXP} XP</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Total XP Coins</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Preview Widget */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={22} color="var(--accent-orange)" />
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {language === 'EN' ? 'Top Learners' : 'ಉನ್ನತ ಕಲಿಯುವವರು'}
            </h4>
          </div>
          <button 
            onClick={() => setActiveTab('top')}
            style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            {language === 'EN' ? 'See All' : 'ಎಲ್ಲಾ ನೋಡಿ'} <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {leaderboard.slice(0, 3).map((item, idx) => (
            <div key={item.id || idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '12px', background: 'var(--bg-input)' }}>
              <span style={{ fontWeight: 900, fontSize: '0.85rem', width: '20px', color: idx === 0 ? '#D97706' : idx === 1 ? '#0284C7' : '#7C3AED' }}>
                #{idx + 1}
              </span>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent-green)', color: '#FFFFFF', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Anekal</div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                {item.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quests Widget */}
      <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="var(--accent-green)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {language === 'EN' ? 'Daily Quests' : 'ದೈನಂದಿನ ಕಾರ್ಯಗಳು'}
            </h4>
          </div>
          <span style={{ background: 'rgba(46, 139, 87, 0.15)', color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px' }}>
            {activeQuestsCount}/4
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: dailyQuests.lessons >= 2 ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
            <CheckCircle2 size={16} color={dailyQuests.lessons >= 2 ? 'var(--accent-green)' : 'var(--text-tertiary)'} />
            <span>2 Lessons Completed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: dailyQuests.quiz80 ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
            <CheckCircle2 size={16} color={dailyQuests.quiz80 ? 'var(--accent-green)' : 'var(--text-tertiary)'} />
            <span>Score 80%+ on Quiz</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: dailyQuests.aiTutor ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
            <CheckCircle2 size={16} color={dailyQuests.aiTutor ? 'var(--accent-green)' : 'var(--text-tertiary)'} />
            <span>Chat with AI Tutor</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
