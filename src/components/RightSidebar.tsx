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
      <div className="card" style={{ padding: '20px', marginBottom: '20px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={user?.avatar || '/avatar_boy.jpg'} 
              alt={user?.name} 
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-green)', boxShadow: 'var(--shadow-sm)' }}
            />
            <span style={{ position: 'absolute', bottom: -2, right: -2, background: 'var(--accent-green)', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>
              Cl {user?.class || 9}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Student'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.school || 'Namma Buddy School'}
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700 }}>
              📍 Anekal, Bengaluru Rural
            </span>
          </div>
        </div>

        {/* Level & XP Progress Bar */}
        <div style={{ background: 'var(--bg-input)', padding: '12px 14px', borderRadius: '16px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-primary)' }}>Level {Math.floor(userXP / 100) + 1}</span>
            <span style={{ color: 'var(--accent-orange)' }}>{userXP} / {nextLevelXP} XP</span>
          </div>
          <div className="progress-track" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${levelProgress}%`, background: 'linear-gradient(90deg, var(--accent-green), var(--accent-orange))' }}></div>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('profile')}
          style={{ width: '100%', padding: '10px', borderRadius: '14px', background: 'var(--bg-app)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <User size={16} /> {language === 'EN' ? 'View Full Profile' : 'ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ'}
        </button>
      </div>

      {/* Gamified Streak & Coins Widget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 200, 87, 0.12)', border: '1px solid rgba(255, 200, 87, 0.3)' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={22} fill="#D97706" color="#D97706" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#D97706' }}>{user?.streak || 0} Days</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Daily Streak</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(77, 168, 255, 0.12)', border: '1px solid rgba(77, 168, 255, 0.3)' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coins size={22} fill="#0284C7" color="#0284C7" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0284C7' }}>{userXP} XP</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Total XP Coins</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Preview Widget */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={18} color="var(--accent-orange)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {language === 'EN' ? 'Top Learners' : 'ಉನ್ನತ ಕಲಿಯುವವರು'}
            </h4>
          </div>
          <button 
            onClick={() => setActiveTab('top')}
            style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
          >
            {language === 'EN' ? 'See All' : 'ಎಲ್ಲಾ ನೋಡಿ'} <ChevronRight size={14} />
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
