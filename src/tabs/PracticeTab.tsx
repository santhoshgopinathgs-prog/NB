import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Gamepad2, PlayCircle, CheckCircle, RefreshCcw, Map as MapIcon, GraduationCap } from 'lucide-react';
import { mockQuizzes, MOCK_MATH_QUESTIONS, MOCK_SCIENCE_QUESTIONS, MOCK_DIGITAL_QUESTIONS } from '../data/mockData';
import '../map.css';

export const PracticeTab = () => {
  const { t, language, user, completedQuizzes, markQuizComplete, userXP } = useAppContext();
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  
  // Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [justEarnedCert, setJustEarnedCert] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);
  const [typingInput, setTypingInput] = useState<string>('');
  const { markQuiz80Percent, markTypingPracticed } = useAppContext();

  // Gamified Map State
  const [selectedMapNode, setSelectedMapNode] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const card = carouselRef.current.children[selectedMapNode] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedMapNode]);

  // Filter quizzes to ONLY show the currently registered student's class
  const filteredQuizzes = mockQuizzes.filter(q => q.class === user?.class);
  
  const activeQuizData = mockQuizzes.find(q => q.id === activeQuiz);
  let activeQuestions = MOCK_MATH_QUESTIONS;
  if (activeQuizData?.subject === 'Science') activeQuestions = MOCK_SCIENCE_QUESTIONS;
  if (activeQuizData?.subject === 'Digital Skills') activeQuestions = MOCK_DIGITAL_QUESTIONS;
  
  if (activeQuizData?.id.endsWith('-2')) {
    activeQuestions = activeQuestions.slice(15, 30);
  } else {
    activeQuestions = activeQuestions.slice(0, 15);
  }

  const handleNext = React.useCallback(() => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      const xpGained = activeQuizData ? activeQuizData.xp : 0;
      markQuizComplete(activeQuiz!, xpGained).then(earnedCert => {
        setJustEarnedCert(earnedCert);
        setQuizCompleted(true);
        if (correctAnswersCount / activeQuestions.length >= 0.8) {
          markQuiz80Percent();
        }
      });
    }
  }, [currentQuestionIndex, activeQuestions.length, activeQuizData, activeQuiz, markQuizComplete, correctAnswersCount, markQuiz80Percent]);

  // Auto-advance after 1.5 seconds when answer is revealed
  React.useEffect(() => {
    let timer: number;
    if (isAnswerRevealed) {
      timer = setTimeout(() => {
        handleNext();
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isAnswerRevealed, handleNext]);

  const handleOptionClick = (i: number) => {
    if (!isAnswerRevealed) {
      setSelectedOption(i);
    }
  };

  const handleConfirm = () => {
    if (selectedOption !== null && !isAnswerRevealed) {
      setIsAnswerRevealed(true);
      if (selectedOption === activeQuestions[currentQuestionIndex].correctAnswer) {
        setCorrectAnswersCount(prev => prev + 1);
      }
    }
  };

  const handleBackToPractice = () => {
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setQuizCompleted(false);
    setJustEarnedCert(false);
    setCorrectAnswersCount(0);
  };

  const typingLevelsEN = [
    "The quick brown fox jumps over the lazy dog",
    "Practice makes perfect when learning to type.",
    "A journey of a thousand miles begins with a single step.",
    "Technology is best when it brings people together.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
  ];
  
  const typingLevelsKN = [
    "ಕನ್ನಡ ಭಾಷೆ ಸುಂದರವಾಗಿದೆ ಮತ್ತು ಕಲಿಯಲು ಸುಲಭವಾಗಿದೆ",
    "ಟೈಪಿಂಗ್ ಕಲಿಯುವಾಗ ಅಭ್ಯಾಸವು ಪರಿಪೂರ್ಣತೆಯನ್ನು ತರುತ್ತದೆ.",
    "ಸಾವಿರ ಮೈಲುಗಳ ಪ್ರಯಾಣವು ಒಂದೇ ಹೆಜ್ಜೆಯಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
    "ತಂತ್ರಜ್ಞಾನವು ಜನರನ್ನು ಒಟ್ಟುಗೂಡಿಸಿದಾಗ ಉತ್ತಮವಾಗಿರುತ್ತದೆ.",
    "ಯಶಸ್ಸು ಅಂತಿಮವಲ್ಲ, ವೈಫಲ್ಯವು ಮಾರಕವಲ್ಲ: ಮುಂದುವರಿಯುವ ಧೈರ್ಯವೇ ಮುಖ್ಯ."
  ];

  const [typingLevel, setTypingLevel] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  React.useEffect(() => {
    if (isTypingActive && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [isTypingActive, timeLeft]);

  if (isTypingActive) {
    const targetTexts = language === 'EN' ? typingLevelsEN : typingLevelsKN;
    const targetText = targetTexts[typingLevel];
    
    const handleTypingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTypingInput(e.target.value);
    };

    const handleFinishLevel = () => {
      if (typingInput.trim() === targetText.trim()) {
        if (typingLevel < 4) {
          setTypingLevel(prev => prev + 1);
          setTypingInput('');
          setTimeLeft(60);
        } else {
          markTypingPracticed();
          setIsTypingActive(false);
          setTypingLevel(0);
          setTypingInput('');
          alert(language === 'EN' ? "All typing levels completed! +30 XP" : "ಎಲ್ಲಾ ಟೈಪಿಂಗ್ ಹಂತಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ! +30 XP");
        }
      } else {
        alert(language === 'EN' ? "Text does not match perfectly. Please fix errors!" : "ಪಠ್ಯವು ಸಂಪೂರ್ಣವಾಗಿ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ದೋಷಗಳನ್ನು ಸರಿಪಡಿಸಿ!");
      }
    };

    return (
      <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button onClick={() => { setIsTypingActive(false); setTypingLevel(0); setTypingInput(''); }} style={{ alignSelf: 'flex-start', color: 'var(--accent-blue)', fontWeight: 600 }}>← {t('backToPracticeList')}</button>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{language === 'EN' ? `Level ${typingLevel + 1} of 5` : `ಹಂತ ${typingLevel + 1} / 5`}</h3>
            <div style={{ background: timeLeft <= 10 ? '#FEE2E2' : '#EFF6FF', color: timeLeft <= 10 ? 'var(--accent-red)' : 'var(--accent-blue)', padding: '6px 12px', borderRadius: '16px', fontWeight: 800, fontSize: '0.9rem' }}>
              ⏱ {timeLeft}s
            </div>
          </div>
          <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>{language === 'EN' ? "Type the following sentence:" : "ಕೆಳಗಿನ ವಾಕ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ:"}</p>
          <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {targetText}
          </div>
          <textarea
            value={typingInput}
            onChange={handleTypingChange}
            placeholder={language === 'EN' ? "Start typing here..." : "ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ..."}
            disabled={timeLeft === 0}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid var(--border-light)', minHeight: '120px', fontSize: '1.1rem', fontFamily: 'inherit', resize: 'vertical' }}
          />
          {timeLeft === 0 ? (
            <button 
              onClick={() => { setTimeLeft(60); setTypingInput(''); }}
              style={{ width: '100%', padding: '16px', marginTop: '16px', borderRadius: '12px', background: 'var(--accent-red)', color: 'white', fontWeight: 700, border: 'none' }}
            >
              {language === 'EN' ? "Time's up! Try Again" : "ಸಮಯ ಮುಗಿದಿದೆ! ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ"}
            </button>
          ) : (
            <button 
              onClick={handleFinishLevel}
              disabled={typingInput.length === 0}
              style={{ width: '100%', padding: '16px', marginTop: '16px', borderRadius: '12px', background: typingInput.length === 0 ? 'var(--border-light)' : 'var(--accent-green)', color: 'white', fontWeight: 700, border: 'none', transition: 'background 0.2s' }}
            >
              {language === 'EN' ? "Finish" : "ಮುಗಿಸಿ"}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (activeQuiz) {
    if (quizCompleted) {
      return (
        <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginTop: '40px' }}>
          {justEarnedCert && (
            <div style={{ background: '#FEF3C7', color: '#D97706', padding: '12px 24px', borderRadius: '16px', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎉 You earned the {activeQuizData?.subject} Certificate!
            </div>
          )}
          
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '16px' }}>
            <CheckCircle size={40} />
          </div>
          <h2 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Great Job!</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            You completed this practice test with a score of <strong>{correctAnswersCount}/{activeQuestions.length}</strong> and earned <strong>+{activeQuizData?.xp} XP</strong>.
          </p>
          <div style={{ background: 'var(--bg-app)', padding: '12px 24px', borderRadius: '20px', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '20px' }}>
            Total XP: {userXP}
          </div>
          
          <button onClick={handleBackToPractice} style={{ width: '100%', padding: '16px', background: 'var(--accent-blue)', color: 'white', fontWeight: 700, borderRadius: '20px', fontSize: '1rem' }}>
            Back to Practice List
          </button>
        </div>
      );
    }

    const currentQuestion = activeQuestions[currentQuestionIndex];
    const options = language === 'EN' ? currentQuestion.options_en : currentQuestion.options_kn;
    const questionText = language === 'EN' ? currentQuestion.question_en : currentQuestion.question_kn;
    
    // Determine difficulty
    let difficulty = 'Easy';
    let diffColor = 'var(--accent-green)';
    let diffBg = '#D1FAE5';
    if (currentQuestionIndex >= 5 && currentQuestionIndex < 10) {
      difficulty = 'Medium';
      diffColor = 'var(--accent-orange)';
      diffBg = '#FEF3C7';
    } else if (currentQuestionIndex >= 10) {
      difficulty = 'Hard';
      diffColor = 'var(--accent-red)';
      diffBg = '#FEE2E2';
    }

    return (
      <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button onClick={handleBackToPractice} style={{ alignSelf: 'flex-start', color: 'var(--accent-blue)', fontWeight: 600 }}>← {t('backToPracticeList')}</button>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                {t('question')} {currentQuestionIndex + 1} {t('of')} {activeQuestions.length}
              </span>
              <span style={{ background: diffBg, color: diffColor, padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {difficulty}
              </span>
            </div>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 700, background: '#FEF3C7', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>+5 XP</span>
          </div>
          <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.4 }}>
            {questionText}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === currentQuestion.correctAnswer;
              
              // Determine styles based on reveal state
              let bgColor = isSelected ? '#EFF6FF' : 'var(--bg-app)';
              let borderColor = isSelected ? 'var(--accent-blue)' : 'var(--border-light)';
              let textColor = isSelected ? 'var(--accent-blue)' : 'var(--text-primary)';
              
              if (isAnswerRevealed) {
                if (isCorrect) {
                  bgColor = '#D1FAE5'; // Light green
                  borderColor = 'var(--accent-green)';
                  textColor = 'var(--accent-green)';
                } else if (isSelected && !isCorrect) {
                  bgColor = '#FEE2E2'; // Light red
                  borderColor = 'var(--accent-red)';
                  textColor = 'var(--accent-red)';
                }
              }

              return (
                <button 
                  key={i} 
                  onClick={() => handleOptionClick(i)}
                  style={{ 
                    padding: '16px', 
                    background: bgColor, 
                    border: `2px solid ${borderColor}`, 
                    borderRadius: '16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px',
                    fontWeight: isSelected || (isAnswerRevealed && isCorrect) ? 700 : 500,
                    color: textColor,
                    transition: 'all 0.2s ease',
                    cursor: isAnswerRevealed ? 'default' : 'pointer'
                  }}
                >
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', 
                    border: `2px solid ${isAnswerRevealed && (isCorrect || isSelected) ? borderColor : (isSelected ? 'var(--accent-blue)' : 'var(--text-tertiary)')}`,
                    background: (isSelected && !isAnswerRevealed) || (isAnswerRevealed && isCorrect) || (isAnswerRevealed && isSelected) ? borderColor : 'transparent',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}></div>
                  {opt}
                </button>
              );
            })}
          </div>
          {!isAnswerRevealed && (
            <button 
              onClick={handleConfirm}
              disabled={selectedOption === null}
              style={{ 
                width: '100%', marginTop: '24px', padding: '16px', 
                background: selectedOption !== null ? 'var(--accent-blue)' : 'var(--border-light)', 
                color: 'white', fontWeight: 700, borderRadius: '20px', fontSize: '1rem',
                cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s'
              }}
            >
              {t('confirm')}
            </button>
          )}
        </div>
      </div>
    );
  }

  const mapNodePositions = [
    { top: '80%', left: '15%' },
    { top: '65%', left: '45%' },
    { top: '75%', left: '75%' },
    { top: '50%', left: '85%' },
    { top: '35%', left: '55%' },
    { top: '45%', left: '25%' },
    { top: '20%', left: '15%' },
    { top: '10%', left: '45%' },
    { top: '25%', left: '75%' },
    { top: '10%', left: '90%' },
  ];

  return (
    <div className="animate-slide-up" style={{ padding: '0 0px 20px', display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MapIcon color="var(--accent-purple)" />
        <h2 style={{ fontSize: '1.5rem' }}>{language === 'EN' ? "Learning Map" : "ಕಲಿಕೆಯ ನಕ್ಷೆ"}</h2>
        <span style={{ marginLeft: 'auto', background: 'var(--bg-app)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
          {t('classText')} {user?.class}
        </span>
      </div>

      {/* Gamified Map Area */}
      <div style={{ padding: '0 20px' }}>
        <div className="map-container">
          <svg className="map-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline 
              points={filteredQuizzes.map((_, i) => `${parseFloat(mapNodePositions[i].left)},${parseFloat(mapNodePositions[i].top)}`).join(' ')} 
              fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="2 2" 
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {filteredQuizzes.map((quiz, i) => {
            const pos = mapNodePositions[i];
            const isCompleted = completedQuizzes.includes(quiz.id);
            const isActive = selectedMapNode === i;
            return (
              <div 
                key={quiz.id}
                className={`map-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedMapNode(i)}
              >
                <div className="map-node-number">{i + 1}</div>
                <GraduationCap size={24} color={isCompleted ? 'var(--accent-green)' : (isActive ? 'var(--accent-purple)' : 'var(--text-tertiary)')} />
                <div className="map-node-label">{language === 'EN' ? quiz.subject : quiz.subject_kn}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Level Cards Carousel */}
      <div className="level-carousel" ref={carouselRef} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {filteredQuizzes.map((quiz, i) => {
          const isCompleted = completedQuizzes.includes(quiz.id);
          const isActive = selectedMapNode === i;
          const title = language === 'EN' ? quiz.title : quiz.title_kn;
          const subject = language === 'EN' ? quiz.subject : quiz.subject_kn;
          
          return (
            <div key={quiz.id} className={`level-card-item ${isActive ? 'active' : ''}`} onClick={() => setSelectedMapNode(i)}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 800 }}>LEVEL {i + 1} • {subject.toUpperCase()}</div>
              <h3 style={{ fontSize: '1.2rem', marginTop: '4px', marginBottom: '8px' }}>{title}</h3>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '20px', marginBottom: '16px', flex: 1, listStyleType: 'disc' }}>
                <li>{quiz.questions} {t('questions')}</li>
                <li>{t('earnUpTo')} {quiz.xp} XP</li>
                {isCompleted && <li style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Completed</li>}
              </ul>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveQuiz(quiz.id); }}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: isCompleted ? 'var(--bg-app)' : 'var(--accent-purple)', color: isCompleted ? 'var(--text-secondary)' : 'white', fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {isCompleted ? <RefreshCcw size={18} /> : <PlayCircle size={18} />}
                {isCompleted ? t('reviewQuiz') : t('startQuiz')}
              </button>
            </div>
          )
        })}
      </div>

      <div style={{ padding: '0 20px', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{language === 'EN' ? "Mini Games" : "ಮಿನಿ ಆಟಗಳು"}</h3>
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{language === 'EN' ? "Typing Practice" : "ಟೈಪಿಂಗ್ ಅಭ್ಯಾಸ"}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              {language === 'EN' ? "Practice typing skills" : "ಟೈಪಿಂಗ್ ಕೌಶಲ್ಯಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ"}
            </div>
          </div>
          <button 
            onClick={() => setIsTypingActive(true)}
            style={{
              width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: 'var(--bg-surface)',
              color: 'var(--accent-purple)',
              border: '2px solid #F3E8FF'
            }}
          >
            <Gamepad2 size={18} />
            {language === 'EN' ? "Start Typing" : "ಟೈಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ"}
          </button>
        </div>
      </div>
    </div>
  );
};
