import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Gamepad2, PlayCircle, CheckCircle, RefreshCcw, Map as MapIcon, GraduationCap } from 'lucide-react';
import { mockQuizzes, MOCK_MATH_QUESTIONS, MOCK_SCIENCE_QUESTIONS, MOCK_DIGITAL_QUESTIONS, MOCK_ENGLISH_QUESTIONS } from '../data/mockData';
import '../map.css';

const ANEKAL_LEVELS = [
  { id: 'anekal-lvl-1', level: 1, title: 'Basics of Computer', title_kn: 'ಕಂಪ್ಯೂಟರ್ ಮೂಲಗಳು', subject: 'Digital Skills', emoji: '💻', color: '#10B981', reward: 50, bullets: ['Parts of Computer', 'Using Mouse', 'Basic Operations'] },
  { id: 'anekal-lvl-2', level: 2, title: 'Typing Champ', title_kn: 'ಟೈಪಿಂಗ್ ಚಾಂಪ್', subject: 'Digital Skills', emoji: '⌨️', color: '#3B82F6', reward: 60, bullets: ['Keyboard Basics', 'Typing Practice', 'Speed & Accuracy'] },
  { id: 'anekal-lvl-3', level: 3, title: 'Number Systems', title_kn: 'ಸಂಖ್ಯಾ ವ್ಯವಸ್ಥೆ', subject: 'Mathematics', emoji: '🧮', color: '#8B5CF6', reward: 70, bullets: ['Natural & Whole', 'Rational Numbers', 'Real Numbers'] },
  { id: 'anekal-lvl-4', level: 4, title: 'Science Explorer', title_kn: 'ವಿಜ್ಞಾನ ಅನ್ವೇಷಕ', subject: 'Science', emoji: '🔬', color: '#F59E0B', reward: 80, bullets: ['Matter & Energy', 'Atoms & Molecules', 'Life Processes'] },
  { id: 'anekal-lvl-5', level: 5, title: 'Online Safety', title_kn: 'ಆನ್‌ಲೈನ್ ಸುರಕ್ಷತೆ', subject: 'Digital Skills', emoji: '🛡️', color: '#EC4899', reward: 90, bullets: ['Strong Passwords', 'Avoid Scams', 'Be Safe Online'] },
  { id: 'anekal-lvl-6', level: 6, title: 'English Master', title_kn: 'ಇಂಗ್ಲಿಷ್ ಮಾಸ್ಟರ್', subject: 'English', emoji: '📖', color: '#06B6D4', reward: 100, bullets: ['Grammar & Tenses', 'Vocabulary', 'Comprehension'] },
  { id: 'anekal-lvl-7', level: 7, title: 'Digital Productivity', title_kn: 'ಡಿಜಿಟಲ್ ಉತ್ಪಾದಕತೆ', subject: 'Digital Skills', emoji: '📊', color: '#EF4444', reward: 110, bullets: ['Word Basics', 'Excel Basics', 'PowerPoint Basics'] },
  { id: 'anekal-lvl-8', level: 8, title: 'Intro to Coding', title_kn: 'ಕೋಡಿಂಗ್ ಪರಿಚಯ', subject: 'Digital Skills', emoji: '👨‍💻', color: '#6366F1', reward: 120, bullets: ['What is Coding', 'Block Logic', 'Create Your Game'] },
  { id: 'anekal-lvl-9', level: 9, title: 'Real Life Project', title_kn: 'ನೈಜ ಜೀವನದ ಯೋಜನೆ', subject: 'Mathematics', emoji: '🚀', color: '#F97316', reward: 130, bullets: ['Problem Solving', 'Team Work', 'Project Building'] },
  { id: 'anekal-lvl-10', level: 10, title: 'Graduation', title_kn: 'ಆನೆಕಲ್ ಪದವಿ', subject: 'English', emoji: '🎓', color: '#EAB308', reward: 200, bullets: ['Showcase Skills', 'Earn Certificate', 'Become Champion!'] }
];

export const PracticeTab = () => {
  const { t, language, user, completedQuizzes, markQuizComplete, userXP, markQuiz80Percent, markTypingPracticed } = useAppContext();
  
  // Active Navigation & Quiz State
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<string>(ANEKAL_LEVELS[0].id);
  const [lockedMsg, setLockedMsg] = useState<string | null>(null);

  // Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [justEarnedCert, setJustEarnedCert] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [bonusXP, setBonusXP] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState<number>(20);

  // Typing Practice State
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);
  const [typingInput, setTypingInput] = useState<string>('');
  const [typingLevel, setTypingLevel] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [typingStatus, setTypingStatus] = useState<{ type: 'error' | 'success', msg: string } | null>(null);

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
    }
  }, [isMathActive, mathTimeLeft]);

  React.useEffect(() => {
    if (isTypingActive && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [isTypingActive, timeLeft]);

  // Question Mapper for all 10 Anekal Roadmap Levels
  const getQuestionsForQuiz = React.useCallback((quizId: string) => {
    switch (quizId) {
      case 'anekal-lvl-1': return MOCK_DIGITAL_QUESTIONS.slice(0, 10);
      case 'anekal-lvl-2': return MOCK_DIGITAL_QUESTIONS.slice(10, 20);
      case 'anekal-lvl-3': return MOCK_MATH_QUESTIONS.slice(0, 10);
      case 'anekal-lvl-4': return MOCK_SCIENCE_QUESTIONS.slice(0, 10);
      case 'anekal-lvl-5': return MOCK_DIGITAL_QUESTIONS.slice(20, 30);
      case 'anekal-lvl-6': return MOCK_ENGLISH_QUESTIONS.slice(0, 10);
      case 'anekal-lvl-7': return MOCK_DIGITAL_QUESTIONS.slice(5, 15);
      case 'anekal-lvl-8': return MOCK_DIGITAL_QUESTIONS.slice(15, 25);
      case 'anekal-lvl-9': return MOCK_MATH_QUESTIONS.slice(10, 20);
      case 'anekal-lvl-10': return MOCK_ENGLISH_QUESTIONS.slice(5, 15);
      default:
        if (quizId.includes('-m-')) return MOCK_MATH_QUESTIONS.slice(0, 10);
        if (quizId.includes('-s-')) return MOCK_SCIENCE_QUESTIONS.slice(0, 10);
        if (quizId.includes('-e-')) return MOCK_ENGLISH_QUESTIONS.slice(0, 10);
        return MOCK_DIGITAL_QUESTIONS.slice(0, 10);
    }
  }, []);

  const activeQuestions = getQuestionsForQuiz(activeQuiz || 'anekal-lvl-1');

  const activeQuizData = mockQuizzes.find(q => q.id === activeQuiz) || {
    id: activeQuiz || 'quiz',
    subject: activeQuiz?.includes('m-') || activeQuiz === 'anekal-lvl-3' || activeQuiz === 'anekal-lvl-9' ? 'Mathematics' : 
             activeQuiz?.includes('s-') || activeQuiz === 'anekal-lvl-4' ? 'Science' :
             activeQuiz?.includes('e-') || activeQuiz === 'anekal-lvl-6' || activeQuiz === 'anekal-lvl-10' ? 'English' : 'Digital Skills',
    title: 'Anekal Practice Quiz',
    xp: 250
  };

  // Question Timer Countdown Effect
  React.useEffect(() => {
    let timerId: any;
    if (activeQuiz && !quizCompleted && !isAnswerRevealed && questionTimeLeft > 0) {
      timerId = setInterval(() => {
        setQuestionTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (activeQuiz && !quizCompleted && !isAnswerRevealed && questionTimeLeft === 0) {
      setIsAnswerRevealed(true);
    }
    return () => clearInterval(timerId);
  }, [activeQuiz, quizCompleted, isAnswerRevealed, questionTimeLeft]);

  const handleNext = React.useCallback(() => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setQuestionTimeLeft(20);
    } else {
      const baseXP = activeQuizData ? activeQuizData.xp : 250;
      const finalXP = baseXP + bonusXP;
      markQuizComplete(activeQuiz!, finalXP).then(earnedCert => {
        setJustEarnedCert(earnedCert);
        setQuizCompleted(true);
        if (correctAnswersCount / activeQuestions.length >= 0.8) {
          markQuiz80Percent();
        }
      });
    }
  }, [currentQuestionIndex, activeQuestions.length, activeQuizData, activeQuiz, markQuizComplete, correctAnswersCount, markQuiz80Percent, bonusXP]);

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
    if (selectedOption !== null && !isAnswerRevealed && activeQuestions[currentQuestionIndex]) {
      setIsAnswerRevealed(true);
      if (selectedOption === activeQuestions[currentQuestionIndex]?.correctAnswer) {
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

  const isLevelUnlocked = (index: number) => {
    if (index === 0) return true; // Level 1 is always unlocked!
    const prevLevelId = ANEKAL_LEVELS[index - 1].id;
    return completedQuizzes.includes(prevLevelId);
  };

  const handleStartLevel = (levelObj: typeof ANEKAL_LEVELS[0], index: number) => {
    if (!isLevelUnlocked(index)) {
      setLockedMsg(language === 'EN' ? `🔒 Please complete Level ${index} first to unlock Level ${index + 1}!` : `🔒 ಹಂತ ${index + 1} ಅನ್‌ಲಾಕ್ ಮಾಡಲು ದಯವಿಟ್ಟು ಮೊದಲು ಹಂತ ${index} ಪೂರ್ಣಗೊಳಿಸಿ!`);
      setTimeout(() => setLockedMsg(null), 3500);
      return;
    }
    setQuestionTimeLeft(20);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setQuizCompleted(false);
    setJustEarnedCert(false);
    setCorrectAnswersCount(0);
    setStreak(0);
    setBonusXP(0);
    setActiveQuiz(levelObj.id);
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

    const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0] || MOCK_DIGITAL_QUESTIONS[0];
    const options = (language === 'EN' ? currentQuestion?.options_en : currentQuestion?.options_kn) || ['Option A', 'Option B', 'Option C', 'Option D'];
    const questionText = (language === 'EN' ? currentQuestion?.question_en : currentQuestion?.question_kn) || 'Question';
    
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
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: questionTimeLeft <= 5 ? '#FEE2E2' : '#EFF6FF',
                color: questionTimeLeft <= 5 ? 'var(--accent-red)' : 'var(--accent-blue)',
                padding: '4px 12px', borderRadius: '16px', fontWeight: 800, fontSize: '0.85rem'
              }}>
                ⏱️ {questionTimeLeft}s
              </div>
              <span style={{ background: diffBg, color: diffColor, padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {difficulty}
              </span>
            </div>
          </div>
          <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.4 }}>
            {questionText}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
            {options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrectOption = i === currentQuestion.correctAnswer;
              
              let style: React.CSSProperties = {
                padding: '18px 24px', 
                borderRadius: '24px', 
                border: '2.5px solid #1E293B',
                background: '#FFFFFF', 
                color: '#1E293B',
                textAlign: 'left', 
                fontWeight: 800, 
                fontSize: '1.1rem',
                cursor: 'pointer', 
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                width: '100%',
                minHeight: '62px'
              };

              if (isAnswerRevealed) {
                if (isCorrectOption) {
                  style.background = '#DCFCE7';
                  style.borderColor = '#16A34A';
                  style.color = '#15803D';
                } else if (isSelected && !isCorrectOption) {
                  style.background = '#FEE2E2';
                  style.borderColor = '#DC2626';
                  style.color = '#991B1B';
                }
              } else if (isSelected) {
                style.borderColor = '#3B82F6';
                style.background = '#EFF6FF';
                style.color = '#1D4ED8';
                style.boxShadow = '0 0 0 2px #3B82F6, 0 6px 16px rgba(59, 130, 246, 0.25)';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleOptionClick(i)}
                  disabled={isAnswerRevealed}
                  style={style}
                >
                  <span>{opt}</span>
                  {isAnswerRevealed && isCorrectOption && <CheckCircle size={22} color="#16A34A" />}
                </button>
              );
            })}
          </div>

          {!isAnswerRevealed && (
            <button 
              onClick={handleConfirm}
              disabled={selectedOption === null}
              style={{ 
                width: '100%', marginTop: '24px', padding: '18px', 
                background: selectedOption !== null ? 'var(--accent-blue)' : '#E2E8F0', 
                color: selectedOption !== null ? 'white' : '#94A3B8',
                fontWeight: 900, borderRadius: '24px', fontSize: '1.1rem',
                cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s', border: 'none',
                boxShadow: selectedOption !== null ? '0 8px 20px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {t('confirm')}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up" style={{ padding: '0 0px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Top Game Status Bar */}
      <div className="game-top-bar">
        {/* User Info Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <img src={user?.avatar || '/avatar_boy.jpg'} alt="Avatar" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #38bdf8' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
              {user?.name || 'Anekal Learner'}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 800 }}>
              Level {completedQuizzes.length + 1}
            </div>
          </div>
        </div>

        {/* Energy, Stars, Coins Middle */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div className="game-stat-item" style={{ color: '#FACC15' }}>
            ⚡ 120/120 <span className="game-add-btn">+</span>
          </div>
          <div className="game-stat-item" style={{ color: '#F59E0B' }}>
            ⭐ 250 <span className="game-add-btn">+</span>
          </div>
          <div className="game-stat-item" style={{ color: '#FBBF24' }}>
            🪙 1250 <span className="game-add-btn">+</span>
          </div>
        </div>

        {/* Quick Action Icons Right */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '1.2rem' }}>🏆</span>
            <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#CBD5E1' }}>Badges</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '1.2rem' }}>🎒</span>
            <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#CBD5E1' }}>Bag</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '1.2rem' }}>⚙️</span>
          </div>
        </div>
      </div>

      {/* Golden Banner Ribbon */}
      <div className="golden-ribbon-banner">
        <div className="golden-ribbon-title">DIGITAL CHAMPS ANEKAL SCHOOL</div>
        <div className="golden-ribbon-subtitle">Learn • Practice • Grow</div>
      </div>

      {/* Locked Level Toast Notification */}
      {lockedMsg && (
        <div className="animate-slide-up" style={{ width: '100%', marginBottom: '16px', padding: '12px 16px', background: '#FEE2E2', border: '2px solid #FCA5A5', color: '#991B1B', borderRadius: '18px', fontWeight: 800, fontSize: '0.9rem', textAlign: 'center', zIndex: 30 }}>
          {lockedMsg}
        </div>
      )}

      {/* Full-Screen Portrait Gamified Roadmap Canvas */}
      <div className="portrait-roadmap-canvas">
        
        {/* Campus Background Image Backdrop */}
        <div className="portrait-roadmap-bg" />
        <div className="portrait-roadmap-overlay" />

        {/* Dynamic SVG Animated Dotted Path Line connecting all 10 milestone nodes */}
        {(() => {
          const nodePositions = [
            { left: 46, top: 5.5 },   // 1. Basics of Computer
            { left: 62, top: 15.0 },  // 2. Typing Champ
            { left: 39, top: 24.5 },  // 3. Internet Navigator
            { left: 64, top: 34.0 },  // 4. Digital Productivity
            { left: 41, top: 43.5 },  // 5. Online Safety
            { left: 63, top: 53.0 },  // 6. Mobile Literacy
            { left: 39, top: 62.5 },  // 7. Digital Creativity
            { left: 65, top: 72.0 },  // 8. Intro to Coding
            { left: 40, top: 81.5 },  // 9. Real Life Project
            { left: 61, top: 91.0 }   // 10. Graduation
          ];

          const pathD = nodePositions.map((pos, idx) => {
            if (idx === 0) return `M ${pos.left}% ${pos.top}%`;
            const prev = nodePositions[idx - 1];
            const midY = (prev.top + pos.top) / 2;
            return `C ${prev.left}% ${midY}%, ${pos.left}% ${midY}%, ${pos.left}% ${pos.top}%`;
          }).join(' ');

          return (
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
              <path
                className="roadmap-path-svg-line"
                d={pathD}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="7"
                strokeDasharray="14 14"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))', opacity: 0.95 }}
              />
            </svg>
          );
        })()}

        {/* 10 Milestone Platforms Connected via Winding Stone Path */}
        {(() => {
          const nodePositions = [
            { left: '46%', top: '5.5%' },   // 1. Basics of Computer (Top Archway Entrance)
            { left: '62%', top: '15.0%' }, // 2. Typing Champ
            { left: '39%', top: '24.5%' }, // 3. Internet Navigator
            { left: '64%', top: '34.0%' }, // 4. Digital Productivity
            { left: '41%', top: '43.5%' }, // 5. Online Safety
            { left: '63%', top: '53.0%' }, // 6. Mobile Literacy
            { left: '39%', top: '62.5%' }, // 7. Digital Creativity
            { left: '65%', top: '72.0%' }, // 8. Intro to Coding
            { left: '40%', top: '81.5%' }, // 9. Real Life Project
            { left: '61%', top: '91.0%' }  // 10. Graduation (Bottom Main School Building)
          ];

          return ANEKAL_LEVELS.map((lvl, index) => {
            const unlocked = isLevelUnlocked(index);
            const isCompleted = completedQuizzes.includes(lvl.id);
            const pos = nodePositions[index];

            return (
              <div 
                key={lvl.level}
                className={`milestone-node-platform ${isCompleted ? 'completed' : (unlocked ? 'active' : 'locked')}`}
                style={{ left: pos.left, top: pos.top }}
                onClick={() => handleStartLevel(lvl, index)}
              >
                {/* Node Number Badge */}
                <div className="node-number-badge">
                  {isCompleted ? '✓' : (unlocked ? lvl.level : '🔒')}
                </div>

                {/* 3D Stone Ring Node Icon */}
                <div className="node-stone-ring">
                  {lvl.emoji}
                </div>

                {/* 3D Label Pill Button */}
                <div 
                  className="node-label-pill"
                  style={{ background: unlocked ? (isCompleted ? '#22C55E' : lvl.color) : '#64748B' }}
                >
                  {language === 'EN' ? lvl.title : lvl.title_kn}
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};
