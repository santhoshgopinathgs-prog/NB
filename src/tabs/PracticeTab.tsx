import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Gamepad2, PlayCircle, CheckCircle, RefreshCcw } from 'lucide-react';
import { mockQuizzes, MOCK_MATH_QUESTIONS, MOCK_SCIENCE_QUESTIONS, MOCK_DIGITAL_QUESTIONS } from '../data/mockData';

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

  if (isTypingActive) {
    const targetText = language === 'EN' ? "The quick brown fox jumps over the lazy dog" : "ಕನ್ನಡ ಭಾಷೆ ಸುಂದರವಾಗಿದೆ ಮತ್ತು ಕಲಿಯಲು ಸುಲಭವಾಗಿದೆ";
    
    const handleTypingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setTypingInput(val);
      if (val.trim().toLowerCase() === targetText.toLowerCase()) {
        markTypingPracticed();
        setTimeout(() => {
          setIsTypingActive(false);
          setTypingInput('');
          alert(language === 'EN' ? "Typing practice completed! +30 XP" : "ಟೈಪಿಂಗ್ ಅಭ್ಯಾಸ ಪೂರ್ಣಗೊಂಡಿದೆ! +30 XP");
        }, 500);
      }
    };

    return (
      <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button onClick={() => setIsTypingActive(false)} style={{ alignSelf: 'flex-start', color: 'var(--accent-blue)', fontWeight: 600 }}>← {t('backToPracticeList')}</button>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>{language === 'EN' ? "Type the following sentence:" : "ಕೆಳಗಿನ ವಾಕ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ:"}</h3>
          <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {targetText}
          </div>
          <textarea
            value={typingInput}
            onChange={handleTypingChange}
            placeholder={language === 'EN' ? "Start typing here..." : "ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ..."}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid var(--border-light)', minHeight: '120px', fontSize: '1.1rem', fontFamily: 'inherit', resize: 'vertical' }}
          />
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

  return (
    <div className="animate-slide-up" style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Gamepad2 color="var(--accent-purple)" />
        <h2 style={{ fontSize: '1.5rem' }}>{t('practice')}</h2>
        <span style={{ marginLeft: 'auto', background: 'var(--bg-app)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
          {t('classText')} {user?.class} {t('quizzes')}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredQuizzes.map((quiz) => {
          const isCompleted = completedQuizzes.includes(quiz.id);
          const subjectName = language === 'EN' ? quiz.subject : quiz.subject_kn;
          const titleName = language === 'EN' ? quiz.title : quiz.title_kn;
          
          return (
            <div key={quiz.id} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  {subjectName}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{titleName}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                  {quiz.questions} {t('questions')} • {t('earnUpTo')} {quiz.xp} {t('xp')}
                </div>
              </div>
              
              <button 
                onClick={() => setActiveQuiz(quiz.id)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: isCompleted ? 'var(--bg-app)' : 'var(--bg-surface)',
                  color: isCompleted ? 'var(--text-secondary)' : 'var(--accent-purple)',
                  border: isCompleted ? '1px solid var(--border-light)' : '2px solid #F3E8FF'
                }}
              >
                {isCompleted ? <RefreshCcw size={18} /> : <PlayCircle size={18} />}
                {isCompleted ? t('reviewQuiz') : t('startQuiz')}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '10px' }}>
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
