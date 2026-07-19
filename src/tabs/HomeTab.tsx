import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Moon, Check, Book, Microscope, Monitor, MessageSquare, Trophy, Gamepad2, GraduationCap, Target } from 'lucide-react';
import { LeaderboardPortal } from '../components/LeaderboardPortal';
import { CertificatesPortal } from '../components/CertificatesPortal';
import { AITutorPortal } from '../components/AITutorPortal';

export const HomeTab = () => {
  const { language, userXP, user } = useAppContext();
  
  const [activePortal, setActivePortal] = useState<'leaderboard' | 'certificates' | 'ai' | null>(null);

  // Dynamic Level Calculation
  const level = Math.floor(userXP / 500) + 1;
  const currentLevelXP = userXP % 500;
  const progressPercent = (currentLevelXP / 500) * 100;
  const streak = user?.streak || 0;

  return (
    <div className="animate-slide-up" style={{ padding: '0 0px 20px 0px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {activePortal === 'leaderboard' && <LeaderboardPortal onClose={() => setActivePortal(null)} />}
      {activePortal === 'certificates' && <CertificatesPortal onClose={() => setActivePortal(null)} />}
      {activePortal === 'ai' && <AITutorPortal onClose={() => setActivePortal(null)} />}

      {/* Search Bar */}
      <div className="search-bar" style={{ margin: '0 20px' }}>
        <Search size={20} color="var(--accent-blue)" />
        <input type="text" placeholder={language === 'EN' ? "What would you like to learn today?" : "ಇಂದು ನೀವು ಏನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?"} />
      </div>

      {/* Level Card */}
      <div className="level-card" style={{ margin: '0 20px', background: 'var(--bg-surface)' }}>
        <div className="level-badge">{level}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '6px', fontWeight: 600 }}>Level {level} - {currentLevelXP} / 500 XP</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%`, background: 'var(--accent-purple)' }}></div>
          </div>
        </div>
        <div style={{ color: streak > 0 ? 'var(--accent-orange)' : 'var(--border-light)' }}>
          <FlameIcon />
        </div>
      </div>

      {/* Today's Mission */}
      <div style={{ margin: '0 20px', background: 'linear-gradient(135deg, var(--accent-blue), #2563eb)', borderRadius: '24px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1, fontSize: '150px' }}>📐</div>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '16px' }}>
          <Moon size={14} fill="#FCD34D" color="#FCD34D" /> {language === 'EN' ? "Today's Mission" : "ಇಂದಿನ ಮಿಷನ್"}
        </div>
        
        <h2 style={{ fontSize: '1.4rem', marginBottom: '8px', position: 'relative', zIndex: 1 }}>{language === 'EN' ? "Coordinate Geometry" : "ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ"}</h2>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {language === 'EN' ? "Chapter 3 • 5 Questions" : "ಅಧ್ಯಾಯ 3 • 5 ಪ್ರಶ್ನೆಗಳು"} <span style={{ color: '#FCD34D' }}>⚡</span> 50 XP
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
          <button style={{ background: 'white', color: '#2563eb', padding: '10px 20px', borderRadius: '24px', fontWeight: 700, fontSize: '0.9rem', border: 'none' }}>
            {language === 'EN' ? "Start Now 🚀" : "ಈಗ ಪ್ರಾರಂಭಿಸಿ 🚀"}
          </button>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>⏱ ~5 min</span>
        </div>
      </div>

      {/* Daily Quests */}
      <div style={{ margin: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem' }}>{language === 'EN' ? "Daily Quests" : "ದೈನಂದಿನ ಪ್ರಶ್ನೆಗಳು"}</h3>
          <span style={{ background: '#D1FAE5', color: '#059669', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '12px', fontWeight: 700 }}>1/4 done</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <QuestCard icon="📚" title={language === 'EN' ? "Complete 2 Lessons" : "2 ಪಾಠಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ"} xp="+50 XP" done />
          <QuestCard icon="🎯" title={language === 'EN' ? "Score 80%+ in a Quiz" : "ರಸಪ್ರಶ್ನೆಯಲ್ಲಿ 80%+ ಸ್ಕೋರ್ ಮಾಡಿ"} xp="+75 XP" />
          <QuestCard icon="🤖" title={language === 'EN' ? "Use AI Tutor" : "AI ಟ್ಯೂಟರ್ ಬಳಸಿ"} xp="+25 XP" />
          <QuestCard icon="⌨️" title={language === 'EN' ? "Practice Typing 5 min" : "5 ನಿಮಿಷ ಟೈಪಿಂಗ್ ಅಭ್ಯಾಸ ಮಾಡಿ"} xp="+30 XP" />
        </div>
      </div>

      {/* Continue Learning */}
      <div style={{ margin: '0 20px', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{language === 'EN' ? 'Continue Learning' : 'ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ'}</h3>
        
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SubjectRow icon={<Book color="var(--accent-blue)" />} title="Mathematics" subtitle="ಗಣಿತ" progress={13} total={28} color="var(--accent-blue)" pct={45} />
          <SubjectRow icon={<Microscope color="var(--accent-green)" />} title="Science" subtitle="ವಿಜ್ಞಾನ" progress={8} total={24} color="var(--accent-green)" pct={32} />
          <SubjectRow icon={<Monitor color="var(--accent-purple)" />} title="Digital Skills" subtitle="ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು" progress={14} total={20} color="var(--accent-purple)" pct={68} />
          
          <button 
            onClick={() => setActivePortal('ai')}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '16px', background: '#FEF3C7', padding: '16px', borderRadius: '16px' }}
          >
            <div style={{ background: 'white', padding: '12px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <MessageSquare color="#f59e0b" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#92400E' }}>AI Tutor</div>
              <div style={{ fontSize: '0.7rem', color: '#B45309' }}>AI ಶಿಕ್ಷಕ</div>
              <div style={{ fontSize: '0.7rem', color: '#D97706', marginTop: '8px' }}>Kannada • English</div>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div style={{ margin: '0 20px', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{language === 'EN' ? "Quick Access" : "ತ್ವರಿತ ಪ್ರವೇಶ"}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <QuickAccessBtn onClick={() => setActivePortal('leaderboard')} icon={<Trophy color="#f59e0b" />} label="Leaderboard" bg="#FEF3C7" />
          <QuickAccessBtn onClick={() => alert('Challenges are generated daily! Check back tomorrow.')} icon={<Gamepad2 color="#8b5cf6" />} label="Challenge" bg="#EDE9FE" />
          <QuickAccessBtn onClick={() => setActivePortal('certificates')} icon={<GraduationCap color="#1f2937" />} label="Certificates" bg="#F3F4F6" />
          <QuickAccessBtn onClick={() => alert('Career mapping is unlocked at Level 20!')} icon={<Target color="#ef4444" />} label="Career" bg="#FEE2E2" />
        </div>
      </div>

      {/* This Week */}
      <div style={{ margin: '0 20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem' }}>{language === 'EN' ? 'This Week' : 'ಈ ವಾರ'}</h3>
          <span style={{ color: 'var(--accent-green)', fontSize: '0.85rem', fontWeight: 700 }}>+{userXP} XP</span>
        </div>
        
        <div className="card" style={{ padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <ChartBar day={language === 'EN' ? "Mon" : "ಸೋಮ"} height="60%" val="80" color="var(--accent-blue)" />
          <ChartBar day={language === 'EN' ? "Tue" : "ಮಂಗಳ"} height="75%" val="95" color="var(--accent-blue)" />
          <ChartBar day={language === 'EN' ? "Wed" : "ಬುಧ"} height="50%" val="70" color="var(--accent-blue)" />
          <ChartBar day={language === 'EN' ? "Thu" : "ಗುರು"} height="80%" val="100" color="var(--accent-green)" />
          <ChartBar day={language === 'EN' ? "Fri" : "ಶುಕ್ರ"} height="65%" val="85" color="var(--accent-blue)" />
          <ChartBar day={language === 'EN' ? "Sat" : "ಶನಿ"} height="40%" val="60" color="var(--accent-orange)" />
          <ChartBar day={language === 'EN' ? "Sun" : "ಭಾನು"} height="25%" val="40" color="var(--accent-orange)" />
        </div>
      </div>

      {/* Weekly Championship */}
      <button 
        onClick={() => setActivePortal('leaderboard')}
        style={{ margin: '0 20px', marginTop: '10px', background: 'linear-gradient(135deg, var(--accent-purple), #6366f1)', borderRadius: '24px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden', textAlign: 'left', border: 'none', cursor: 'pointer', display: 'block' }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <Trophy size={48} color="#FCD34D" fill="#FCD34D" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Weekly Championship</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '16px' }}>Score 90%+ in any quiz this week</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, width: 'fit-content' }}>
                ⏱ 3 days left
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, width: 'fit-content', color: '#FCD34D' }}>
                🎁 500 XP
              </div>
            </div>
          </div>
        </div>
      </button>

    </div>
  );
};

// Subcomponents

const QuestCard = ({ icon, title, xp, done }: any) => (
  <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '36px', height: '36px', background: 'var(--bg-app)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: done ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>{title}</div>
        {done && <div className="progress-track" style={{ marginTop: '8px', width: '150px' }}><div className="progress-fill" style={{ width: '100%', background: 'var(--accent-green)' }}></div></div>}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ background: '#D97706', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}>{xp}</div>
      {done && <div style={{ background: 'var(--accent-green)', borderRadius: '4px', padding: '2px' }}><Check size={14} color="white" /></div>}
    </div>
  </div>
);

const QuickAccessBtn = ({ icon, label, bg, onClick }: any) => (
  <button 
    onClick={onClick}
    className="quick-access-btn"
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
  >
    <div style={{ width: '100%', aspectRatio: '1/1', background: bg, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}>
      {icon}
    </div>
    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</div>
  </button>
);

const FlameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-orange)" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.6568 15.6569C16.7196 17.5314 14.8105 18.8284 12.5 19.3284C10.1895 18.8284 8.28036 17.5314 7.34315 15.6569C6.40594 13.7824 6.78036 11.5314 8.15685 10.1569C9.53334 8.78235 11.7844 8.40793 13.6588 9.34514C15.5333 10.2824 16.8303 12.1915 17.3303 14.5C17.8303 16.8085 17.1569 19.1895 15.6569 20.6895" fill="var(--accent-orange)"/>
  </svg>
);

const SubjectRow = ({ icon, title, subtitle, progress, total, color, pct }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'var(--bg-app)', padding: '12px', borderRadius: '12px', width: 'fit-content', marginBottom: '12px' }}>
          {icon}
        </div>
        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{title}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{subtitle}</div>
      </div>
      <div style={{ background: 'var(--bg-app)', color: color, fontWeight: 700, padding: '4px 10px', borderRadius: '16px', fontSize: '0.75rem' }}>
        {pct}%
      </div>
    </div>
    <div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '6px' }}>{progress}/{total} lessons</div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }}></div>
      </div>
    </div>
  </div>
);

const ChartBar = ({ day, height, val, color }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: color }}>{val}</div>
    <div style={{ width: '20px', height: '100px', background: 'var(--bg-app)', borderRadius: '4px', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ width: '100%', height: height, background: color, borderRadius: '4px' }}></div>
    </div>
    <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{day}</div>
  </div>
);
