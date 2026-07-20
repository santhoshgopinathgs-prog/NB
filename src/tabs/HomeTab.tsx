import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Moon, Check, Book, Microscope, Monitor, MessageSquare, Trophy, Gamepad2, GraduationCap, Target, BookOpen } from 'lucide-react';
import { LeaderboardPortal } from '../components/LeaderboardPortal';
import { CertificatesPortal } from '../components/CertificatesPortal';
import { AITutorPortal } from '../components/AITutorPortal';
import { syllabusData } from '../data/mockData';

export const HomeTab = ({ navigateToChapter, setActiveTab }: { navigateToChapter?: (subjectId: string, subjectDisplay: string, chapter: string) => void, setActiveTab?: (tab: string) => void }) => {
  const { language, userXP, user, completedQuizzes, dailyQuests, claimQuestXP, incrementLessonsCompleted, markQuiz80Percent, markAITutorUsed, markTypingPracticed } = useAppContext();
  
  const [activePortal, setActivePortal] = useState<'leaderboard' | 'certificates' | 'ai' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInitialQuery, setAiInitialQuery] = useState('');

  // Auto-claim quest XP when returning to Home Tab
  React.useEffect(() => {
    if (dailyQuests.lessons >= 2 && !dailyQuests.lessonsClaimed) {
      claimQuestXP('lessons', 50);
    }
    if (dailyQuests.quiz80 && !dailyQuests.quiz80Claimed) {
      claimQuestXP('quiz80', 75);
    }
    if (dailyQuests.aiTutor && !dailyQuests.aiTutorClaimed) {
      claimQuestXP('aiTutor', 25);
    }
    if (dailyQuests.typing && !dailyQuests.typingClaimed) {
      claimQuestXP('typing', 30);
    }
  }, [dailyQuests, claimQuestXP]);

  // Filter syllabus data based on search query
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    
    const results: { classLevel: number; subjectId: string; subject: string; chapter: string; chapter_kn: string }[] = [];
    const query = searchQuery.toLowerCase();
    
    syllabusData.forEach(level => {
      level.subjects.forEach(subject => {
        subject.chapters.forEach((chapter, idx) => {
          const chapterKn = subject.chapters_kn[idx];
          if (chapter.toLowerCase().includes(query) || chapterKn.includes(query) || subject.name.toLowerCase().includes(query)) {
            results.push({
              classLevel: level.classLevel,
              subjectId: subject.name,
              subject: language === 'EN' ? subject.name : subject.name_kn,
              chapter: chapter,
              chapter_kn: chapterKn
            });
          }
        });
      });
    });
    return results.slice(0, 5); // Limit to 5 results
  };

  const searchResults = getSearchResults();

  const handleSearchSelect = (res: any) => {
    if (navigateToChapter) {
      navigateToChapter(res.subjectId, res.subject, res.chapter);
    } else {
      setAiInitialQuery(language === 'EN' ? res.chapter : res.chapter_kn);
      setActivePortal('ai');
    }
    setSearchQuery('');
  };

  // Dynamic Level Calculation
  const level = Math.floor(userXP / 500) + 1;
  const currentLevelXP = userXP % 500;
  const progressPercent = (currentLevelXP / 500) * 100;
  const streak = user?.streak || 0;

  // Dynamic Subject Progress
  const mathCompleted = completedQuizzes.filter(q => q.includes('-m-')).length;
  const scienceCompleted = completedQuizzes.filter(q => q.includes('-s-')).length;
  const digitalCompleted = completedQuizzes.filter(q => q.includes('-d-')).length;
  const englishCompleted = completedQuizzes.filter(q => q.includes('-e-')).length;

  return (
    <div className="animate-slide-up" style={{ padding: '0 0px 20px 0px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {activePortal === 'leaderboard' && <LeaderboardPortal onClose={() => setActivePortal(null)} />}
      {activePortal === 'certificates' && <CertificatesPortal onClose={() => setActivePortal(null)} />}
      {activePortal === 'ai' && <AITutorPortal onClose={() => setActivePortal(null)} initialQuery={aiInitialQuery} />}

      {/* Search Bar */}
      <div style={{ margin: '0 20px', position: 'relative' }}>
        <div className="search-bar" style={{ margin: 0 }}>
          <Search size={20} color="var(--accent-blue)" />
          <input 
            type="text" 
            placeholder={language === 'EN' ? "What would you like to learn today?" : "ಇಂದು ನೀವು ಏನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?"} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                if (searchResults.length > 0) {
                  handleSearchSelect(searchResults[0]);
                } else {
                  setAiInitialQuery(searchQuery);
                  setActivePortal('ai');
                  setSearchQuery('');
                }
              }
            }}
          />
        </div>
        
        {/* Search Results Dropdown */}
        {searchQuery.trim() && (
          <div style={{ 
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', 
            background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', 
            border: '1px solid var(--border-light)', zIndex: 10, overflow: 'hidden'
          }}>
            {searchResults.length > 0 ? (
              searchResults.map((res, i) => (
                <div 
                  key={i}
                  onClick={() => handleSearchSelect(res)}
                  style={{ 
                    padding: '12px 16px', borderBottom: i < searchResults.length - 1 ? '1px solid var(--border-light)' : 'none',
                    display: 'flex', flexDirection: 'column', cursor: 'pointer', background: 'white', transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {language === 'EN' ? res.chapter : res.chapter_kn}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {language === 'EN' ? `Class ${res.classLevel} • ${res.subject}` : `ತರಗತಿ ${res.classLevel} • ${res.subject}`}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                {language === 'EN' ? "No topics found. Press Enter to ask the AI Tutor!" : "ಯಾವುದೇ ವಿಷಯಗಳು ಕಂಡುಬಂದಿಲ್ಲ. AI ಶಿಕ್ಷಕರನ್ನು ಕೇಳಲು Enter ಒತ್ತಿರಿ!"}
              </div>
            )}
          </div>
        )}
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
      <div style={{ margin: '0 20px', background: 'linear-gradient(135deg, #2E8B57, #1E5E3A)', borderRadius: '24px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 24px rgba(46, 139, 87, 0.25)' }}>
        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.08, fontSize: '150px' }}>📐</div>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '16px' }}>
          <Moon size={14} fill="#FFC857" color="#FFC857" /> {language === 'EN' ? "Today's Mission" : "ಇಂದಿನ ಮಿಷನ್"}
        </div>
        
        <h2 style={{ fontSize: '1.4rem', marginBottom: '8px', position: 'relative', zIndex: 1, fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>{language === 'EN' ? "Coordinate Geometry" : "ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ"}</h2>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {language === 'EN' ? "Chapter 3 • 5 Questions" : "ಅಧ್ಯಾಯ 3 • 5 ಪ್ರಶ್ನೆಗಳು"} <span style={{ color: '#FFC857' }}>⚡</span> 50 XP
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
          <button 
            onClick={() => navigateToChapter && navigateToChapter('Mathematics', 'Mathematics', 'Coordinate Geometry')}
            style={{ background: '#FFFFFF', color: '#2E8B57', padding: '10px 22px', borderRadius: '24px', fontWeight: 800, fontSize: '0.9rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', transition: 'transform 0.1s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          >
            {language === 'EN' ? "Start Now 🚀" : "ಈಗ ಪ್ರಾರಂಭಿಸಿ 🚀"}
          </button>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>⏱ ~5 min</span>
        </div>
      </div>

      {/* Daily Quests */}
      <div style={{ margin: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontWeight: 800, color: '#1F2937' }}>{language === 'EN' ? "Daily Quests" : "ದೈನಂದಿನ ಪ್ರಶ್ನೆಗಳು"}</h3>
          <span style={{ background: '#D1FAE5', color: '#2E8B57', border: '1px solid #A7F3D0', fontSize: '0.75rem', padding: '4px 12px', borderRadius: '12px', fontWeight: 800 }}>
            {[dailyQuests.lessons >= 2, dailyQuests.quiz80, dailyQuests.aiTutor, dailyQuests.typing].filter(Boolean).length}/4 done
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <QuestCard 
            icon="📚" title={language === 'EN' ? "Complete 2 Lessons" : "2 ಪಾಠಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ"} xp="+50 XP" done={dailyQuests.lessons >= 2} progress={dailyQuests.lessons / 2} 
            onClick={() => setActiveTab && setActiveTab('learn')}
          />
          <QuestCard 
            icon="🎯" title={language === 'EN' ? "Score 80%+ in a Quiz" : "ರಸಪ್ರಶ್ನೆಯಲ್ಲಿ 80%+ ಸ್ಕೋರ್ ಮಾಡಿ"} xp="+75 XP" done={dailyQuests.quiz80} progress={dailyQuests.quiz80 ? 1 : 0} 
            onClick={() => setActiveTab && setActiveTab('practice')}
          />
          <QuestCard 
            icon="🤖" title={language === 'EN' ? "Use AI Tutor" : "AI ಟ್ಯೂಟರ್ ಬಳಸಿ"} xp="+25 XP" done={dailyQuests.aiTutor} progress={dailyQuests.aiTutor ? 1 : 0} 
            onClick={() => setActivePortal('ai')}
          />
          <QuestCard 
            icon="⌨️" title={language === 'EN' ? "Practice Typing" : "ಟೈಪಿಂಗ್ ಅಭ್ಯಾಸ ಮಾಡಿ"} xp="+30 XP" done={dailyQuests.typing} progress={dailyQuests.typing ? 1 : 0} 
            onClick={() => setActiveTab && setActiveTab('practice')}
          />
        </div>
      </div>

      {/* Continue Learning */}
      <div style={{ margin: '0 20px', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{language === 'EN' ? 'Continue Learning' : 'ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ'}</h3>
        
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SubjectRow icon={<Book color="var(--accent-blue)" />} title="Mathematics" subtitle="ಗಣಿತ" progress={mathCompleted} total={28} color="var(--accent-blue)" pct={Math.round((mathCompleted/28)*100)} />
          <SubjectRow icon={<Microscope color="var(--accent-green)" />} title="Science" subtitle="ವಿಜ್ಞಾನ" progress={scienceCompleted} total={24} color="var(--accent-green)" pct={Math.round((scienceCompleted/24)*100)} />
          <SubjectRow icon={<Monitor color="var(--accent-purple)" />} title="Digital Skills" subtitle="ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು" progress={digitalCompleted} total={20} color="var(--accent-purple)" pct={Math.round((digitalCompleted/20)*100)} />
          <SubjectRow icon={<BookOpen color="#ec4899" />} title="English" subtitle="ಇಂಗ್ಲಿಷ್" progress={englishCompleted} total={20} color="#ec4899" pct={Math.round((englishCompleted/20)*100)} />
          
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
          <QuickAccessBtn onClick={() => setActiveTab && setActiveTab('practice')} icon={<Gamepad2 color="#8b5cf6" />} label="Challenge" bg="#EDE9FE" />
          <QuickAccessBtn onClick={() => setActivePortal('certificates')} icon={<GraduationCap color="#1f2937" />} label="Certificates" bg="#F3F4F6" />
          <QuickAccessBtn onClick={() => { setAiInitialQuery('What career options are available for me after school in Karnataka?'); setActivePortal('ai'); }} icon={<Target color="#ef4444" />} label="Career" bg="#FEE2E2" />
        </div>
      </div>

      {/* This Week */}
      <div style={{ margin: '0 20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem' }}>{language === 'EN' ? 'This Week' : 'ಈ ವಾರ'}</h3>
          <span style={{ color: 'var(--accent-green)', fontSize: '0.85rem', fontWeight: 700 }}>+{userXP} XP</span>
        </div>
        
        <div className="card" style={{ padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {Array(7).fill(0).map((_, index) => {
            const daysEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const daysKN = ['ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ', 'ಭಾನು'];
            const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; 
            
            const xp = index === currentDayIndex ? userXP : 0;
            const maxWeeklyXP = Math.max(userXP, 100);
            
            const height = xp === 0 ? '5%' : `${Math.max((xp / maxWeeklyXP) * 100, 5)}%`;
            const dayLabel = language === 'EN' ? daysEN[index] : daysKN[index];
            const color = xp > 0 ? "var(--accent-green)" : "var(--accent-blue)";
            
            return <ChartBar key={index} day={dayLabel} height={height} val={xp} color={color} />;
          })}
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

const QuestCard = ({ icon, title, xp, done, progress = 0, onClick }: any) => (
  <div onClick={onClick} style={{ cursor: onClick && !done ? 'pointer' : 'default', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-light)', borderRadius: '20px', background: 'transparent', opacity: done ? 0.7 : 1 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '36px', height: '36px', background: '#EBE3D5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: done ? 'var(--text-tertiary)' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>{title}</div>
        <div className="progress-track" style={{ marginTop: '8px', width: '150px', background: '#E0D9C8' }}><div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%`, background: 'var(--accent-green)' }}></div></div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ background: 'var(--accent-green)', color: 'var(--text-primary)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>{xp}</div>
      {done && <div style={{ background: 'var(--accent-green)', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color="white" /></div>}
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

const ChartBar = ({ day, height, val, color }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1, cursor: 'pointer', transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s ease-in-out' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: color, opacity: isHovered ? 1 : 0.7 }}>{val}</div>
      <div style={{ width: '20px', height: '100px', background: 'var(--bg-app)', borderRadius: '4px', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', height: height, background: color, borderRadius: '4px', filter: isHovered ? 'brightness(1.1)' : 'none', transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
      </div>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', fontWeight: isHovered ? 700 : 500 }}>{day}</div>
    </div>
  );
};
