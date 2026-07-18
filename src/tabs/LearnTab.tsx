import React, { useState, useEffect } from 'react';
import { BookOpen, PlayCircle, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { syllabusData, textbookContent, LEARN_MATH_QUESTIONS, LEARN_SCIENCE_QUESTIONS, LEARN_DIGITAL_QUESTIONS } from '../data/mockData';

export const LearnTab = () => {
  const { t, language, user, markQuizComplete, userXP, completedQuizzes } = useAppContext();
  const [activeChapter, setActiveChapter] = useState<{ subjectId: string, subjectDisplay: string, chapter: string } | null>(null);
  
  // Quiz State
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [justEarnedCert, setJustEarnedCert] = useState(false);
  
  const classSyllabus = syllabusData.find(s => s.classLevel === user?.class);
  
  // Calculate quiz ID for completion logic
  const chapterIdx = classSyllabus?.subjects.find(s => s.name === activeChapter?.subjectId)?.chapters.indexOf(activeChapter?.chapter || '') || 0;
  const prefix = activeChapter?.subjectId === 'Digital Skills' ? 'd' : activeChapter?.subjectId?.charAt(0).toLowerCase();
  const mockQuizId = `c${user?.class}-${prefix}-${chapterIdx + 1}`;

  let activeQuestions = LEARN_MATH_QUESTIONS;
  if (activeChapter?.subjectId === 'Science') activeQuestions = LEARN_SCIENCE_QUESTIONS;
  if (activeChapter?.subjectId === 'Digital Skills') activeQuestions = LEARN_DIGITAL_QUESTIONS;

  const handleNext = React.useCallback(async () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, activeQuestions.length]);

  // Auto-advance after 1.5 seconds when answer is revealed
  useEffect(() => {
    let timer: number;
    if (isAnswerRevealed) {
      timer = setTimeout(() => {
        handleNext();
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isAnswerRevealed, handleNext]);

  const handleMarkComplete = async () => {
    // Award XP and complete quiz ID logic
    const earnedCert = await markQuizComplete(mockQuizId, 100);
    setJustEarnedCert(earnedCert);
    
    // Reset state and exit chapter
    setIsQuizActive(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setQuizCompleted(false);
    
    // We can leave them on the chapter page or close it. Let's just close it.
    setActiveChapter(null);
    
    if (earnedCert) {
      alert(language === 'EN' ? `🎉 You earned the ${activeChapter?.subjectDisplay} Certificate!` : `🎉 ನೀವು ಪ್ರಮಾಣಪತ್ರವನ್ನು ಗಳಿಸಿದ್ದೀರಿ!`);
    }
  };

  if (activeChapter) {
    if (isQuizActive) {
      if (quizCompleted) {
        return (
          <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginTop: '40px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '16px' }}>
              <CheckCircle size={40} />
            </div>
            <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Great Job!</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              You completed this chapter quiz!
            </p>
            <button 
              onClick={handleMarkComplete} 
              style={{ width: '100%', padding: '16px', background: 'var(--accent-green)', color: 'white', fontWeight: 700, borderRadius: '20px', fontSize: '1rem' }}
            >
              Claim XP & Mark Chapter Complete
            </button>
          </div>
        );
      }

      const currentQuestion = activeQuestions[currentQuestionIndex];
      const options = language === 'EN' ? currentQuestion.options_en : currentQuestion.options_kn;
      const questionText = language === 'EN' ? currentQuestion.question_en : currentQuestion.question_kn;
      
      return (
        <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button onClick={() => setIsQuizActive(false)} style={{ alignSelf: 'flex-start', color: 'var(--accent-blue)', fontWeight: 600, background: 'none', border: 'none', padding: 0 }}>← Back to Notes</button>
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  {t('question')} {currentQuestionIndex + 1} {t('of')} {activeQuestions.length}
                </span>
                <span style={{ background: '#E0E7FF', color: 'var(--accent-blue)', padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  LEARN QUIZ
                </span>
              </div>
            </div>
            <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.4 }}>
              {questionText}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === currentQuestion.correctAnswer;
                
                let bgColor = isSelected ? '#EFF6FF' : 'var(--bg-app)';
                let borderColor = isSelected ? 'var(--accent-blue)' : 'var(--border-light)';
                let textColor = isSelected ? 'var(--accent-blue)' : 'var(--text-primary)';
                
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    bgColor = '#D1FAE5'; borderColor = 'var(--accent-green)'; textColor = 'var(--accent-green)';
                  } else if (isSelected) {
                    bgColor = '#FEE2E2'; borderColor = 'var(--accent-red)'; textColor = 'var(--accent-red)';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => !isAnswerRevealed && setSelectedOption(i)}
                    style={{ background: bgColor, border: `2px solid ${borderColor}`, color: textColor, padding: '16px 20px', borderRadius: '16px', fontSize: '1.05rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span>{opt}</span>
                    {isAnswerRevealed && isCorrect && <CheckCircle size={20} color="var(--accent-green)" />}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => selectedOption !== null && !isAnswerRevealed && setIsAnswerRevealed(true)}
              disabled={selectedOption === null || isAnswerRevealed}
              style={{ width: '100%', marginTop: '32px', padding: '16px', background: selectedOption !== null ? 'var(--accent-blue)' : '#94A3B8', color: 'white', fontWeight: 700, borderRadius: '20px', fontSize: '1.1rem', border: 'none', cursor: selectedOption !== null ? 'pointer' : 'not-allowed', opacity: isAnswerRevealed ? 0.5 : 1 }}
            >
              {isAnswerRevealed ? 'Revealing Answer...' : t('confirm')}
            </button>
          </div>
        </div>
      );
    }

    const content = textbookContent[activeChapter.subjectId];
    const lessonText = content ? (language === 'EN' ? content.en : content.kn) : 'Content coming soon...';

    return (
      <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button 
          onClick={() => setActiveChapter(null)} 
          style={{ alignSelf: 'flex-start', color: 'var(--accent-blue)', fontWeight: 600, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '1rem' }}
        >
          ← {language === 'EN' ? 'Back to Syllabus' : 'ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಹಿಂತಿರುಗಿ'}
        </button>
        
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            {activeChapter.subjectDisplay}
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>{activeChapter.chapter}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.1rem' }}>{language === 'EN' ? 'Chapter Notes' : 'ಅಧ್ಯಾಯ ಟಿಪ್ಪಣಿಗಳು'}</h3>
            <div style={{ width: '100%', height: '400px', background: '#475569', borderRadius: '12px', padding: '16px', overflowY: 'auto', boxShadow: 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ background: 'white', minHeight: '100%', padding: '32px', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                <h1 style={{ color: '#1E293B', fontSize: '1.5rem', marginBottom: '24px', borderBottom: '2px solid #E2E8F0', paddingBottom: '12px' }}>
                  {activeChapter.chapter}
                </h1>
                <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#334155', whiteSpace: 'pre-wrap' }}>
                  {lessonText}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setIsQuizActive(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--bg-app)', borderRadius: '12px', border: '1px solid var(--border-light)', cursor: 'pointer', textAlign: 'left', width: '100%' }}
            >
              <PlayCircle color="var(--accent-green)" size={24} />
              <div style={{ flex: 1, fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{language === 'EN' ? 'Take Practice Quiz' : 'ಅಭ್ಯಾಸ ರಸಪ್ರಶ್ನೆ ತೆಗೆದುಕೊಳ್ಳಿ'}</div>
              <div style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 700 }}>{language === 'EN' ? 'Start' : 'ಪ್ರಾರಂಭಿಸಿ'}</div>
            </button>
          </div>
          
          <button 
            onClick={handleMarkComplete}
            style={{ 
              width: '100%', marginTop: '32px', padding: '16px', 
              background: 'var(--accent-green)', 
              color: 'white', fontWeight: 700, borderRadius: '20px', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', border: 'none'
            }}
          >
            <CheckCircle size={20} />
            {language === 'EN' ? 'Mark as Complete' : 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 20px' }}>
        <BookOpen color="var(--accent-blue)" />
        <h2 style={{ fontSize: '1.5rem' }}>{t('learn')}</h2>
        <span 
          style={{ 
            marginLeft: 'auto', background: 'var(--bg-app)', padding: '6px 14px', 
            borderRadius: '16px', fontSize: '0.85rem', fontWeight: 700, 
            color: 'var(--accent-blue)', border: '1px solid var(--border-light)'
          }}
        >
          {t('classText')} {user?.class} Syllabus
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {classSyllabus?.subjects.map((subject, idx) => {
          const subjectName = language === 'EN' ? subject.name : subject.name_kn;
          
          return (
            <div key={idx} style={{ padding: '0 20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>{subjectName}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {subject.chapters.map((chapter, chapterIdx) => {
                  const chapterName = language === 'EN' ? chapter : subject.chapters_kn[chapterIdx];
                  
                  // Calculate mockQuizId to check completion status
                  const prefix = subject.name === 'Digital Skills' ? 'd' : subject.name.charAt(0).toLowerCase();
                  const mockQuizId = `c${user?.class}-${prefix}-${chapterIdx + 1}`;
                  const isCompleted = completedQuizzes.includes(mockQuizId);
                  
                  return (
                    <button 
                      key={chapterIdx} 
                      onClick={() => setActiveChapter({ subjectId: subject.name, subjectDisplay: subjectName, chapter: chapterName })}
                      className="card" 
                      style={{ 
                        display: 'flex', alignItems: 'center', padding: '16px', gap: '16px', 
                        border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                        background: isCompleted ? '#D1FAE5' : '#EFF6FF', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isCompleted ? 'var(--accent-green)' : 'var(--accent-blue)'
                      }}>
                        {isCompleted ? <CheckCircle size={20} /> : <PlayCircle size={20} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{chapterName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{language === 'EN' ? '4 Lessons' : '4 ಪಾಠಗಳು'} • {language === 'EN' ? '1 Practice Test' : '1 ಅಭ್ಯಾಸ ಪರೀಕ್ಷೆ'}</div>
                      </div>
                      {isCompleted && (
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', background: '#D1FAE5', padding: '4px 8px', borderRadius: '12px' }}>
                          {language === 'EN' ? 'Completed' : 'ಪೂರ್ಣಗೊಂಡಿದೆ'}
                        </div>
                      )}
                    </button>
                  );
                })}
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
