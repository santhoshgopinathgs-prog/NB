import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Gamepad2, PlayCircle, CheckCircle, RefreshCcw, Map as MapIcon, GraduationCap } from 'lucide-react';
import { mockQuizzes, MOCK_MATH_QUESTIONS, MOCK_SCIENCE_QUESTIONS, MOCK_DIGITAL_QUESTIONS, MOCK_ENGLISH_QUESTIONS } from '../data/mockData';
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
  const [streak, setStreak] = useState<number>(0);
  const [bonusXP, setBonusXP] = useState<number>(0);
  
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);
  const [typingInput, setTypingInput] = useState<string>('');
  const { markQuiz80Percent, markTypingPracticed } = useAppContext();

  // Math Flashcards State
  const [isMathActive, setIsMathActive] = useState<boolean>(false);
  const [mathScore, setMathScore] = useState<number>(0);
  const [mathTimeLeft, setMathTimeLeft] = useState<number>(30);
  const [mathProblem, setMathProblem] = useState<{q: string, a: number}>({q: '2 + 2', a: 4});
  const [mathInput, setMathInput] = useState<string>('');

  const generateMathProblem = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 12) + 1;
    let n2 = Math.floor(Math.random() * 12) + 1;
    
    if (op === '-') {
      if (n2 > n1) [n1, n2] = [n2, n1];
    }
    
    const ans = op === '+' ? n1 + n2 : (op === '-' ? n1 - n2 : n1 * n2);
    setMathProblem({ q: `${n1} ${op} ${n2}`, a: ans });
    setMathInput('');
  };

  React.useEffect(() => {
    if (isMathActive && mathTimeLeft > 0) {
      const timerId = setInterval(() => setMathTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (isMathActive && mathTimeLeft === 0) {
      if (mathScore > 0) {
        // We'd usually add XP via context here, simulate it for now
        // markQuizComplete(`math_game`, mathScore); // if we wanted to
      }
    }
  }, [isMathActive, mathTimeLeft]);

  // Gamified Map State
  const filteredQuizzes = mockQuizzes.filter(q => q.class === user?.class);
  
  const activeQuizData = mockQuizzes.find(q => q.id === activeQuiz);
  let activeQuestions = MOCK_MATH_QUESTIONS;
  if (activeQuizData?.subject === 'Science') activeQuestions = MOCK_SCIENCE_QUESTIONS;
  if (activeQuizData?.subject === 'Digital Skills') activeQuestions = MOCK_DIGITAL_QUESTIONS;
  if (activeQuizData?.subject === 'English') activeQuestions = MOCK_ENGLISH_QUESTIONS;
  
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
      const baseXP = activeQuizData ? activeQuizData.xp : 0;
      const finalXP = baseXP + bonusXP;
      markQuizComplete(activeQuiz!, finalXP).then(earnedCert => {
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
        setStreak(prev => {
          const newStreak = prev + 1;
          if (newStreak >= 3) {
            setBonusXP(bx => bx + 5); // +5 bonus XP for streak
          }
          return newStreak;
        });
      } else {
        setStreak(0);
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
    setStreak(0);
    setBonusXP(0);
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
  const [typingStatus, setTypingStatus] = useState<{ type: 'error' | 'success', msg: string } | null>(null);

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
      if (typingStatus) setTypingStatus(null);
    };

    const handleFinishLevel = () => {
      const userText = typingInput.trim();
      const target = targetText.trim();

      if (userText === target) {
        if (typingLevel < 4) {
          setTypingLevel(prev => prev + 1);
          setTypingInput('');
          setTimeLeft(60);
          setTypingStatus({
            type: 'success',
            msg: language === 'EN' ? `🎉 Level ${typingLevel + 1} Passed! Moving to Level ${typingLevel + 2}...` : `🎉 ಹಂತ ${typingLevel + 1} ಪೂರ್ಣಗೊಂಡಿದೆ! ಹಂತ ${typingLevel + 2} ಕ್ಕೆ ಸಾಗುತ್ತಿದೆ...`
          });
        } else {
          markTypingPracticed();
          setIsTypingActive(false);
          setTypingLevel(0);
          setTypingInput('');
          setTypingStatus(null);
        }
      } else {
        if (userText.toLowerCase() === target.toLowerCase()) {
          setTypingStatus({
            type: 'error',
            msg: language === 'EN' ? "⚠️ Check capital letters! (e.g. 'T' instead of 't')" : "⚠️ ದೊಡ್ಡ ಅಕ್ಷರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ!"
          });
        } else {
          setTypingStatus({
            type: 'error',
            msg: language === 'EN' ? "⚠️ Text does not match. Please check spelling & spaces!" : "⚠️ ಪಠ್ಯವು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಕಾಗುಣಿತವನ್ನು ಪರಿಶೀಲಿಸಿ!"
          });
        }
      }
    };

    return (
      <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button onClick={() => { setIsTypingActive(false); setTypingLevel(0); setTypingInput(''); setTypingStatus(null); }} style={{ alignSelf: 'flex-start', color: 'var(--accent-blue)', fontWeight: 600 }}>← {t('backToPracticeList')}</button>
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
            style={{ 
              width: '100%', padding: '16px', borderRadius: '12px', 
              border: typingStatus?.type === 'error' ? '2px solid var(--accent-red)' : (typingStatus?.type === 'success' ? '2px solid var(--accent-green)' : '2px solid var(--border-light)'), 
              minHeight: '120px', fontSize: '1.1rem', fontFamily: 'inherit', resize: 'vertical',
              transition: 'border-color 0.2s'
            }}
          />
          
          {typingStatus && (
            <div className="animate-slide-up" style={{ 
              padding: '12px 16px', marginTop: '12px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem',
              background: typingStatus.type === 'error' ? '#FEE2E2' : '#D1FAE5',
              color: typingStatus.type === 'error' ? 'var(--accent-red)' : 'var(--accent-green)',
              border: `1px solid ${typingStatus.type === 'error' ? '#FCA5A5' : '#6EE7B7'}`
            }}>
              {typingStatus.msg}
            </div>
          )}

          {timeLeft === 0 ? (
            <button 
              onClick={() => { setTimeLeft(60); setTypingInput(''); setTypingStatus(null); }}
              style={{ width: '100%', padding: '16px', marginTop: '16px', borderRadius: '12px', background: 'var(--accent-red)', color: 'white', fontWeight: 700, border: 'none' }}
            >
              {language === 'EN' ? "Time's up! Try Again" : "ಸಮಯ ಮುಗಿದಿದೆ! ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ"}
            </button>
          ) : (
            <button 
              onClick={handleFinishLevel}
              disabled={typingInput.length === 0}
              style={{ width: '100%', padding: '16px', marginTop: '16px', borderRadius: '12px', background: typingInput.length === 0 ? 'var(--border-light)' : 'var(--accent-green)', color: 'white', fontWeight: 700, border: 'none', transition: 'background 0.2s', cursor: typingInput.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              {language === 'EN' ? "Finish" : "ಮುಗಿಸಿ"}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isMathActive) {
    const handleMathSubmit = () => {
      if (parseInt(mathInput) === mathProblem.a) {
        setMathScore(prev => prev + 10);
        generateMathProblem();
      } else {
        setMathInput('');
      }
    };

    return (
      <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button onClick={() => { setIsMathActive(false); setMathScore(0); setMathTimeLeft(30); }} style={{ alignSelf: 'flex-start', color: 'var(--accent-orange)', fontWeight: 600 }}>← {t('backToPracticeList')}</button>
        <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#92400e' }}>{language === 'EN' ? "Math Flashcards" : "ಗಣಿತ ಫ್ಲಾಶ್‌ಕಾರ್ಡ್‌ಗಳು"}</h3>
            <div style={{ background: mathTimeLeft <= 10 ? '#FEE2E2' : 'white', color: mathTimeLeft <= 10 ? 'var(--accent-red)' : '#92400e', padding: '6px 16px', borderRadius: '20px', fontWeight: 800, fontSize: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              ⏱ {mathTimeLeft}s
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d97706' }}>Score: {mathScore}</div>
          </div>

          <div style={{ background: 'white', padding: '30px', borderRadius: '24px', marginBottom: '24px', fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-primary)', textAlign: 'center', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)' }}>
            {mathProblem.q} = ?
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="number"
              value={mathInput}
              onChange={(e) => setMathInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && mathTimeLeft > 0 && handleMathSubmit()}
              placeholder="Answer..."
              disabled={mathTimeLeft === 0}
              autoFocus
              style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '2px solid #fcd34d', fontSize: '1.5rem', fontFamily: 'inherit', textAlign: 'center', fontWeight: 700 }}
            />
            <button 
              onClick={handleMathSubmit}
              disabled={mathTimeLeft === 0}
              style={{ padding: '16px 24px', borderRadius: '16px', background: '#f59e0b', color: 'white', fontWeight: 800, border: 'none', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)' }}
            >
              Go
            </button>
          </div>

          {mathTimeLeft === 0 && (
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '16px' }}>Time's Up! You scored {mathScore} XP</div>
              <button 
                onClick={() => { setMathTimeLeft(30); setMathScore(0); generateMathProblem(); }}
                style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#f59e0b', color: 'white', fontWeight: 700, border: 'none' }}
              >
                {language === 'EN' ? "Play Again" : "ಮತ್ತೆ ಆಡಿ"}
              </button>
            </div>
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
          <div style={{ background: 'var(--bg-app)', padding: '12px 24px', borderRadius: '20px', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '20px', textAlign: 'center' }}>
            <div>Total XP: {userXP}</div>
            {bonusXP > 0 && <div style={{ color: 'var(--accent-orange)', fontSize: '0.9rem', marginTop: '4px' }}>🔥 +{bonusXP} Streak Bonus!</div>}
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
              <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                {t('question')} {currentQuestionIndex + 1} {t('of')} {activeQuestions.length}
              </div>
              {streak >= 3 && (
                <div className="animate-slide-up" style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  🔥 {streak} Streak! (+XP)
                </div>
              )}
            </div>
            <span style={{ background: diffBg, color: diffColor, padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
              {difficulty}
            </span>
          </div>
          <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.4 }}>
            {questionText}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrectOption = i === currentQuestion.correctAnswer;
              
              let bgColor = isSelected ? '#EFF6FF' : 'var(--bg-app)';
              let borderColor = isSelected ? 'var(--accent-blue)' : 'var(--border-light)';
              let textColor = isSelected ? 'var(--accent-blue)' : 'var(--text-primary)';
              let transformStyle = isSelected ? 'scale(1.02)' : 'scale(1)';
              
              if (isAnswerRevealed) {
                if (isCorrectOption) {
                  bgColor = '#D1FAE5'; // Light green
                  borderColor = 'var(--accent-green)';
                  textColor = 'var(--accent-green)';
                  transformStyle = 'scale(1.03)'; // pop effect
                } else if (isSelected) {
                  bgColor = '#FEE2E2'; // Light red
                  borderColor = 'var(--accent-red)';
                  textColor = 'var(--accent-red)';
                  transformStyle = 'translateX(5px)'; // shake effect simulation
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
                    fontWeight: isSelected || (isAnswerRevealed && isCorrectOption) ? 700 : 500,
                    color: textColor,
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: transformStyle,
                    cursor: isAnswerRevealed ? 'default' : 'pointer'
                  }}
                >
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', 
                    border: `2px solid ${isAnswerRevealed && (isCorrectOption || isSelected) ? borderColor : (isSelected ? 'var(--accent-blue)' : 'var(--text-tertiary)')}`,
                    background: (isSelected && !isAnswerRevealed) || (isAnswerRevealed && isCorrectOption) || (isAnswerRevealed && isSelected) ? borderColor : 'transparent',
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
            {/* Outline path for game look */}
            <polyline 
              points={filteredQuizzes.map((_, i) => `${parseFloat(mapNodePositions[i].left)},${parseFloat(mapNodePositions[i].top)}`).join(' ')} 
              fill="none" stroke="#334155" strokeWidth="8" strokeDasharray="12 12" strokeLinecap="round" strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Inner path */}
            <polyline 
              points={filteredQuizzes.map((_, i) => `${parseFloat(mapNodePositions[i].left)},${parseFloat(mapNodePositions[i].top)}`).join(' ')} 
              fill="none" stroke="#ffffff" strokeWidth="4" strokeDasharray="12 12" strokeLinecap="round" strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {filteredQuizzes.map((quiz, i) => {
            const pos = mapNodePositions[i];
            const isCompleted = completedQuizzes.includes(quiz.id);
            
            // Map subjects to emojis
            let emoji = '🎓';
            if (quiz.subject === 'Mathematics') emoji = '🧮';
            if (quiz.subject === 'Science') emoji = '🔬';
            if (quiz.subject === 'Digital Skills') emoji = '💻';
            if (quiz.subject === 'English') emoji = '📖';
            
            return (
              <div 
                key={quiz.id}
                className={`map-node ${isCompleted ? 'completed' : ''}`}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setActiveQuiz(quiz.id)}
              >
                <div className="map-node-number">{i + 1}</div>
                <div style={{ filter: isCompleted ? 'none' : 'grayscale(100%) opacity(70%)' }}>
                  {emoji}
                </div>
                <div className="map-node-label">{language === 'EN' ? quiz.subject : quiz.subject_kn}</div>
              </div>
            )
          })}
        </div>
      </div>


      <div style={{ padding: '0 20px', marginTop: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{language === 'EN' ? "Mini Games" : "ಮಿನಿ ಆಟಗಳು"}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Typing Practice */}
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

          {/* Math Flashcards */}
          <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'linear-gradient(to right, white, #fef3c7)' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#b45309' }}>{language === 'EN' ? "Math Flashcards" : "ಗಣಿತ ಫ್ಲಾಶ್‌ಕಾರ್ಡ್‌ಗಳು"}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                {language === 'EN' ? "Rapid-fire math challenge!" : "ಕ್ಷಿಪ್ರ ಗಣಿತ ಸವಾಲು!"}
              </div>
            </div>
            <button 
              onClick={() => { setIsMathActive(true); setMathTimeLeft(30); setMathScore(0); generateMathProblem(); }}
              style={{
                width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 10px rgba(245, 158, 11, 0.2)'
              }}
            >
              <Gamepad2 size={18} />
              {language === 'EN' ? "Play Now" : "ಈಗ ಆಡಿ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
