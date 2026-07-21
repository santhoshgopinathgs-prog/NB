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
      <div style={{ width: '100%', position: 'relative' }}>
        <div className="search-bar" style={{ margin: 0 }}>
          <Search size={24} color="var(--accent-blue)" />
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
      <div className="level-card" style={{ width: '100%', background: 'var(--bg-surface)', padding: '18px 24px' }}>
        <div className="level-badge" style={{ width: '52px', height: '52px', fontSize: '1.3rem' }}>{level}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>Level {level} - {currentLevelXP} / 500 XP</div>
          <div className="progress-track" style={{ height: '10px' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%`, background: 'var(--accent-purple)' }}></div>
          </div>
        </div>
        <div style={{ color: streak > 0 ? 'var(--accent-orange)' : 'var(--border-light)' }}>
          <FlameIcon />
        </div>
      </div>

      {/* Today's Mission */}
      <div style={{ width: '100%', background: 'linear-gradient(135deg, #15803D 0%, #166534 60%, #064E3B 100%)', borderRadius: '28px', padding: '32px 36px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 30px rgba(22, 101, 52, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Left Info Section */}
        <div style={{ position: 'relative', zIndex: 2, flex: '1 1 320px', maxWidth: '580px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', padding: '8px 18px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '20px', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Moon size={16} fill="#FFC857" color="#FFC857" /> {language === 'EN' ? "Today's Mission" : "ಇಂದಿನ ಮಿಷನ್"}
          </div>
          
          <h2 style={{ fontSize: '2.1rem', marginBottom: '12px', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.2)', letterSpacing: '-0.5px' }}>
            {language === 'EN' ? "Coordinate Geometry" : "ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ"}
          </h2>
          
          <div style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.95)', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
            <span>{language === 'EN' ? "Chapter 3 • 5 Questions" : "ಅಧ್ಯಾಯ 3 • 5 ಪ್ರಶ್ನೆಗಳು"}</span>
            <span style={{ background: 'rgba(255,200,87,0.25)', color: '#FFC857', padding: '3px 12px', borderRadius: '12px', border: '1px solid rgba(255,200,87,0.4)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              ⚡ 50 XP
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => navigateToChapter && navigateToChapter('Mathematics', 'Mathematics', 'Coordinate Geometry')}
              style={{ background: '#FFFFFF', color: '#15803D', padding: '14px 32px', borderRadius: '30px', fontWeight: 800, fontSize: '1.05rem', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0px) scale(1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)'; }}
            >
              {language === 'EN' ? "Start Now 🚀" : "ಈಗ ಪ್ರಾರಂಭಿಸಿ 🚀"}
            </button>
            <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              ⏱ ~5 min
            </span>
          </div>
        </div>

        {/* Right Section: SPACIOUS & LIVELY Animated Math Instruments (Drafting Compass, Protractor, Set Square) */}
        <div style={{ position: 'relative', width: '270px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, flexShrink: 0 }}>
          
          {/* Subtle Ambient Glowing Radial Aura */}
          <div style={{ position: 'absolute', width: '210px', height: '210px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />

          {/* Instrument 1: Floating Drafting Compass (Top-Left Badge) */}
          <div 
            className="animate-float-slow"
            style={{ 
              position: 'absolute', top: '0px', left: '10px', 
              background: 'rgba(255, 255, 255, 0.18)', backdropFilter: 'blur(10px)', 
              border: '1.5px solid rgba(255, 255, 255, 0.35)', borderRadius: '20px', 
              padding: '12px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}
            title="Geometry Compass"
          >
            <svg width="40" height="40" viewBox="0 0 60 60" fill="none" stroke="#FFC857" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="30" cy="12" r="5" fill="#FFC857" />
              <path d="M 30 17 L 15 50" strokeWidth="4" />
              <path d="M 30 17 L 45 50" strokeWidth="4" />
              <circle cx="15" cy="50" r="3" fill="#FFFFFF" />
              <circle cx="45" cy="50" r="3.5" fill="#FFFFFF" />
              <path d="M 10 50 L 50 50" strokeDasharray="3 3" strokeWidth="2.5" stroke="#FFFFFF" />
            </svg>
          </div>

          {/* Instrument 2: Floating Angle Protractor (Top-Right Badge) */}
          <div 
            className="animate-float-medium"
            style={{ 
              position: 'absolute', top: '15px', right: '5px', 
              background: 'rgba(255, 255, 255, 0.18)', backdropFilter: 'blur(10px)', 
              border: '1.5px solid rgba(255, 255, 255, 0.35)', borderRadius: '20px', 
              padding: '12px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}
            title="Angle Protractor"
          >
            <svg width="42" height="42" viewBox="0 0 60 60" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 42 A 20 20 0 0 1 50 42 Z" strokeWidth="3.5" fill="rgba(255,255,255,0.1)" />
              <line x1="30" y1="42" x2="30" y2="24" stroke="#FFC857" strokeWidth="2.5" strokeDasharray="2 2" />
              <line x1="18" y1="42" x2="14" y2="28" />
              <line x1="42" y1="42" x2="46" y2="28" />
              <line x1="23" y1="42" x2="20" y2="25" />
              <line x1="37" y1="42" x2="40" y2="25" />
            </svg>
          </div>

          {/* Instrument 3: Floating Set Square Ruler (Bottom Center Badge) */}
          <div 
            className="animate-float-fast"
            style={{ 
              position: 'absolute', bottom: '0px', right: '60px', 
              background: 'rgba(255, 255, 255, 0.22)', backdropFilter: 'blur(12px)', 
              border: '1.5px solid rgba(255, 255, 255, 0.45)', borderRadius: '22px', 
              padding: '14px 18px', boxShadow: '0 10px 28px rgba(0, 0, 0, 0.25)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}
            title="Set Square Ruler"
          >
            <svg width="52" height="52" viewBox="0 0 70 70" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 12 58 L 58 58 L 12 12 Z" strokeWidth="4" fill="rgba(255,255,255,0.15)" />
              <path d="M 22 48 L 44 48 L 22 26 Z" strokeWidth="2.5" stroke="#FFC857" />
              <line x1="12" y1="22" x2="19" y2="22" />
              <line x1="12" y1="30" x2="22" y2="30" />
              <line x1="12" y1="38" x2="19" y2="38" />
              <line x1="12" y1="46" x2="22" y2="46" />
              <line x1="22" y1="58" x2="22" y2="51" />
              <line x1="30" y1="58" x2="30" y2="48" />
              <line x1="38" y1="58" x2="38" y2="51" />
              <line x1="46" y1="58" x2="46" y2="48" />
            </svg>
          </div>

          {/* Floating Math Sparkles */}
          <span className="animate-float-slow" style={{ position: 'absolute', top: '5px', left: '120px', fontSize: '1.1rem' }}>✨</span>
          <span className="animate-float-fast" style={{ position: 'absolute', bottom: '10px', left: '0px', fontSize: '1.2rem' }}>📐</span>
        </div>

      </div>

      {/* Daily Quests */}
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'Georgia, "Times New Roman", Times, serif', fontWeight: 800, color: 'var(--text-primary)' }}>{language === 'EN' ? "Daily Quests" : "ದೈನಂದಿನ ಪ್ರಶ್ನೆಗಳು"}</h3>
          <span style={{ background: 'rgba(46, 139, 87, 0.15)', color: 'var(--accent-green)', border: '1px solid rgba(46, 139, 87, 0.3)', fontSize: '0.85rem', padding: '6px 14px', borderRadius: '14px', fontWeight: 800 }}>
            {[dailyQuests.lessons >= 2, dailyQuests.quiz80, dailyQuests.aiTutor, dailyQuests.typing].filter(Boolean).length}/4 done
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
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
      <div style={{ width: '100%', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{language === 'EN' ? 'Continue Learning' : 'ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ'}</h3>
        
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <SubjectRow 
            icon={<Book size={28} color="var(--accent-blue)" />} 
            title="Mathematics" 
            subtitle="ಗಣಿತ" 
            progress={mathCompleted} 
            total={28} 
            color="var(--accent-blue)" 
            pct={Math.round((mathCompleted/28)*100)} 
            onClick={() => navigateToChapter && navigateToChapter('Mathematics', 'Mathematics', 'Rational Numbers')}
          />
          <SubjectRow 
            icon={<Microscope size={28} color="var(--accent-green)" />} 
            title="Science" 
            subtitle="ವಿಜ್ಞಾನ" 
            progress={scienceCompleted} 
            total={24} 
            color="var(--accent-green)" 
            pct={Math.round((scienceCompleted/24)*100)} 
            onClick={() => navigateToChapter && navigateToChapter('Science', 'Science', 'Crop Production and Management')}
          />
          <SubjectRow 
            icon={<Monitor size={28} color="var(--accent-purple)" />} 
            title="Digital Skills" 
            subtitle="ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು" 
            progress={digitalCompleted} 
            total={20} 
            color="var(--accent-purple)" 
            pct={Math.round((digitalCompleted/20)*100)} 
            onClick={() => navigateToChapter && navigateToChapter('Digital Skills', 'Digital Skills', 'Computer Hardware & OS')}
          />
          <SubjectRow 
            icon={<BookOpen size={28} color="#ec4899" />} 
            title="English" 
            subtitle="ಇಂಗ್ಲಿಷ್" 
            progress={englishCompleted} 
            total={20} 
            color="#ec4899" 
            pct={Math.round((englishCompleted/20)*100)} 
            onClick={() => navigateToChapter && navigateToChapter('English', 'English', 'The Best Christmas Present in the World')}
          />
          
          <button 
            onClick={() => setActivePortal('ai')}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '18px', background: '#FEF3C7', padding: '18px', borderRadius: '18px' }}
          >
            <div style={{ background: 'white', padding: '14px', borderRadius: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <MessageSquare size={32} color="#f59e0b" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#92400E' }}>AI Tutor</div>
              <div style={{ fontSize: '0.85rem', color: '#B45309', fontWeight: 600 }}>AI ಶಿಕ್ಷಕ</div>
              <div style={{ fontSize: '0.8rem', color: '#D97706', marginTop: '6px', fontWeight: 700 }}>Kannada • English</div>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div style={{ width: '100%', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{language === 'EN' ? "Quick Access" : "ತ್ವರಿತ ಪ್ರವೇಶ"}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%' }}>
          <QuickAccessBtn onClick={() => setActivePortal('leaderboard')} icon={<Trophy size={36} color="#f59e0b" />} label="Leaderboard" bg="#FEF3C7" />
          <QuickAccessBtn onClick={() => setActiveTab && setActiveTab('practice')} icon={<Gamepad2 size={36} color="#8b5cf6" />} label="Challenge" bg="#EDE9FE" />
          <QuickAccessBtn onClick={() => setActivePortal('certificates')} icon={<GraduationCap size={36} color="#1f2937" />} label="Certificates" bg="#F3F4F6" />
          <QuickAccessBtn onClick={() => { setAiInitialQuery('What career options are available for me after school in Karnataka?'); setActivePortal('ai'); }} icon={<Target size={36} color="#ef4444" />} label="Career" bg="#FEE2E2" />
        </div>
      </div>

      {/* This Week */}
      <div style={{ width: '100%', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{language === 'EN' ? 'This Week' : 'ಈ ವಾರ'}</h3>
          <span style={{ color: 'var(--accent-green)', fontSize: '1rem', fontWeight: 800 }}>+{userXP} XP</span>
        </div>
        
        <div className="card" style={{ padding: '28px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
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
        style={{ width: '100%', marginTop: '10px', background: 'linear-gradient(135deg, var(--accent-purple), #6366f1)', borderRadius: '24px', padding: '28px', color: 'white', position: 'relative', overflow: 'hidden', textAlign: 'left', border: 'none', cursor: 'pointer', display: 'block' }}
      >
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <Trophy size={56} color="#FCD34D" fill="#FCD34D" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: 800 }}>Weekly Championship</h3>
            <p style={{ fontSize: '0.95rem', opacity: 0.95, marginBottom: '18px', fontWeight: 600 }}>Score 90%+ in any quiz this week</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.25)', padding: '6px 14px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 700 }}>
                ⏱ 3 days left
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.25)', padding: '6px 14px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 800, color: '#FCD34D' }}>
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
  <div onClick={onClick} style={{ cursor: onClick && !done ? 'pointer' : 'default', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-light)', borderRadius: '20px', background: 'var(--bg-surface)', opacity: done ? 0.75 : 1, boxShadow: 'var(--shadow-sm)', gap: '10px', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
      <div style={{ width: '42px', height: '42px', minWidth: '42px', background: '#EBE3D5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: done ? 'var(--text-tertiary)' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        <div className="progress-track" style={{ marginTop: '8px', width: '100%', maxWidth: '160px', height: '8px', background: '#E0D9C8' }}><div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%`, background: 'var(--accent-green)' }}></div></div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
      <div style={{ background: 'var(--accent-green)', color: '#FFFFFF', padding: '5px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>{xp}</div>
      {done && <div style={{ background: 'var(--accent-green)', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '22px', minHeight: '22px' }}><Check size={14} color="white" /></div>}
    </div>
  </div>
);

const QuickAccessBtn = ({ icon, label, bg, onClick }: any) => (
  <button 
    onClick={onClick}
    className="quick-access-btn"
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
  >
    <div style={{ width: '100%', height: '90px', background: bg, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease', boxShadow: 'var(--shadow-sm)' }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {icon}
    </div>
    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>{label}</div>
  </button>
);

const FlameIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--accent-orange)" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.6568 15.6569C16.7196 17.5314 14.8105 18.8284 12.5 19.3284C10.1895 18.8284 8.28036 17.5314 7.34315 15.6569C6.40594 13.7824 6.78036 11.5314 8.15685 10.1569C9.53334 8.78235 11.7844 8.40793 13.6588 9.34514C15.5333 10.2824 16.8303 12.1915 17.3303 14.5C17.8303 16.8085 17.1569 19.1895 15.6569 20.6895" fill="var(--accent-orange)"/>
  </svg>
);

const SubjectRow = ({ icon, title, subtitle, progress, total, color, pct, onClick }: any) => (
  <div 
    onClick={onClick}
    style={{ 
      display: 'flex', flexDirection: 'column', gap: '14px', 
      cursor: 'pointer', padding: '14px', borderRadius: '18px', 
      transition: 'all 0.2s ease', background: 'var(--bg-surface, #F8FAFC)',
      border: '1.5px solid var(--border-light, #E2E8F0)'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
      e.currentTarget.style.borderColor = color;
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'var(--border-light, #E2E8F0)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'white', padding: '14px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {title} <span style={{ fontSize: '0.9rem', color: color, fontWeight: 800 }}>➔</span>
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ background: 'white', color: color, fontWeight: 800, padding: '6px 14px', borderRadius: '16px', fontSize: '0.85rem', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
        {pct}%
      </div>
    </div>
    <div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>{progress}/{total} lessons</div>
      <div className="progress-track" style={{ height: '10px' }}>
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }}></div>
      </div>
    </div>
  </div>
);

const ChartBar = ({ day, height, val, color }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer', transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.2s ease-in-out' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: color, opacity: isHovered ? 1 : 0.8 }}>{val}</div>
      <div style={{ width: '28px', height: '120px', background: 'var(--bg-app)', borderRadius: '6px', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', height: height, background: color, borderRadius: '6px', filter: isHovered ? 'brightness(1.1)' : 'none', transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: isHovered ? 800 : 700 }}>{day}</div>
    </div>
  );
};
