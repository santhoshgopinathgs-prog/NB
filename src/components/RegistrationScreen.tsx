import React, { useState } from 'react';
import { BookOpen, User, GraduationCap, ArrowRight, School, ChevronLeft, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../utils/supabaseClient';

export const RegistrationScreen = () => {
  const { language, toggleLanguage } = useAppContext();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      if (forgotPasswordMode) {
        // Forgot Password Flow
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        
        if (error) throw error;
        setSuccessMsg(language === 'EN' ? 'Password reset link sent to your email.' : 'ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.');
      } else if (isLoginMode) {
        // Login Flow
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });
        if (error) throw error;
      } else {
        // Registration Flow
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              name: name.trim(),
              school: school.trim(),
              class_level: selectedClass
            }
          }
        });
        
        if (error) throw error;
        // If email confirmation is off, they will be logged in immediately.
        // If email confirmation is on, we'd show a success message here.
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    if (forgotPasswordMode) return email.includes('@');
    if (isLoginMode) return email.includes('@') && password.length >= 6;
    return email.includes('@') && password.length >= 6 && name.trim().length > 0 && school.trim().length > 0 && selectedClass !== null;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
      padding: '24px'
    }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="Namma Buddy Logo" style={{ height: '40px' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Namma<span style={{ color: 'var(--accent-blue)' }}> Buddy</span></h1>
        </div>
        
        <button 
          onClick={toggleLanguage}
          style={{ 
            background: 'white', 
            border: '1px solid var(--border-light)',
            borderRadius: '20px',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        >
          <span style={{ padding: '6px 12px', borderRadius: '16px', background: language === 'EN' ? 'var(--accent-blue)' : 'transparent', color: language === 'EN' ? 'white' : 'inherit', transition: 'all 0.2s ease' }}>EN</span>
          <span style={{ padding: '6px 12px', borderRadius: '16px', background: language === 'KN' ? 'var(--accent-blue)' : 'transparent', color: language === 'KN' ? 'white' : 'inherit', transition: 'all 0.2s ease' }}>KN</span>
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        
        {/* Toggle Switch */}
        {!forgotPasswordMode && (
          <div style={{ display: 'flex', background: '#E2E8F0', borderRadius: '24px', padding: '4px', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => { setIsLoginMode(false); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1, padding: '12px', borderRadius: '20px', border: 'none',
                background: !isLoginMode ? 'white' : 'transparent',
                color: !isLoginMode ? 'var(--accent-blue)' : '#64748B',
                fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                boxShadow: !isLoginMode ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {language === 'EN' ? 'Sign Up' : 'ಸೈನ್ ಅಪ್ ಮಾಡಿ'}
            </button>
            <button
              type="button"
              onClick={() => { setIsLoginMode(true); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1, padding: '12px', borderRadius: '20px', border: 'none',
                background: isLoginMode ? 'white' : 'transparent',
                color: isLoginMode ? 'var(--accent-blue)' : '#64748B',
                fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                boxShadow: isLoginMode ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {language === 'EN' ? 'Log In' : 'ಲಾಗಿನ್ ಮಾಡಿ'}
            </button>
          </div>
        )}

        {forgotPasswordMode && (
          <button 
            type="button"
            onClick={() => { setForgotPasswordMode(false); setErrorMsg(''); setSuccessMsg(''); }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', marginBottom: '24px', fontWeight: 600 }}
          >
            <ChevronLeft size={20} /> {language === 'EN' ? 'Back to Login' : 'ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ'}
          </button>
        )}

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1E293B', marginBottom: '12px', lineHeight: 1.2 }}>
            {forgotPasswordMode
              ? (language === 'EN' ? 'Reset Password' : 'ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ')
              : isLoginMode 
                ? (language === 'EN' ? 'Welcome back.' : 'ಮತ್ತೆ ಸ್ವಾಗತ.')
                : (language === 'EN' ? 'Start your learning journey today.' : 'ನಿಮ್ಮ ಕಲಿಕೆಯ ಪಯಣವನ್ನು ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ.')}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.5 }}>
            {forgotPasswordMode
              ? (language === 'EN' ? 'Enter your email to receive a password reset link.' : 'ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಪಡೆಯಲು ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ.')
              : isLoginMode 
                ? (language === 'EN' ? 'Enter your email and password to continue learning.' : 'ಕಲಿಕೆಯನ್ನು ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ನಮೂದಿಸಿ.')
                : (language === 'EN' ? 'Create a profile to track your progress, earn XP, and collect certificates.' : 'ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು, XP ಗಳಿಸಲು ಮತ್ತು ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಸಂಗ್ರಹಿಸಲು ಪ್ರೊಫೈಲ್ ರಚಿಸಿ.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#FEE2E2', color: '#EF4444', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
              <AlertCircle size={20} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#D1FAE5', color: '#10B981', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
              <CheckCircle2 size={20} /> {successMsg}
            </div>
          )}

          {(!isLoginMode && !forgotPasswordMode) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} /> {language === 'EN' ? 'What is your name?' : 'ನಿಮ್ಮ ಹೆಸರೇನು?'}
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'EN' ? 'Enter your full name' : 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'}
                style={{ 
                  padding: '16px', borderRadius: '16px', border: '2px solid transparent', 
                  background: 'white', fontSize: '1rem', color: '#1E293B', outline: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'border 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
                required={!isLoginMode && !forgotPasswordMode}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={16} /> {language === 'EN' ? 'Email Address' : 'ಇಮೇಲ್ ವಿಳಾಸ'}
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'EN' ? 'Enter your email' : 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ'}
              style={{ 
                padding: '16px', borderRadius: '16px', border: '2px solid transparent', 
                background: 'white', fontSize: '1rem', color: '#1E293B', outline: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'border 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
              required
            />
          </div>

          {!forgotPasswordMode && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={16} /> {language === 'EN' ? 'Password' : 'ಪಾಸ್ವರ್ಡ್'}
                </label>
                {isLoginMode && (
                  <button 
                    type="button"
                    onClick={() => setForgotPasswordMode(true)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {language === 'EN' ? 'Forgot Password?' : 'ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?'}
                  </button>
                )}
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'EN' ? 'Enter at least 6 characters' : 'ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳನ್ನು ನಮೂದಿಸಿ'}
                style={{ 
                  padding: '16px', borderRadius: '16px', border: '2px solid transparent', 
                  background: 'white', fontSize: '1rem', color: '#1E293B', outline: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'border 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
                required={!forgotPasswordMode}
              />
            </div>
          )}

          {(!isLoginMode && !forgotPasswordMode) && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <School size={16} /> {language === 'EN' ? 'School Name' : 'ಶಾಲೆಯ ಹೆಸರು'}
                </label>
                <input 
                  type="text" 
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder={language === 'EN' ? 'Enter your school name' : 'ನಿಮ್ಮ ಶಾಲೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'}
                  style={{ 
                    padding: '16px', borderRadius: '16px', border: '2px solid transparent', 
                    background: 'white', fontSize: '1rem', color: '#1E293B', outline: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'border 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                  required={!isLoginMode && !forgotPasswordMode}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GraduationCap size={16} /> {language === 'EN' ? 'Select your class' : 'ನಿಮ್ಮ ತರಗತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[8, 9, 10].map(cls => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setSelectedClass(cls)}
                      style={{
                        flex: 1, padding: '16px', borderRadius: '16px',
                        background: selectedClass === cls ? 'var(--accent-blue)' : 'white',
                        color: selectedClass === cls ? 'white' : '#64748B',
                        border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer',
                        boxShadow: selectedClass === cls ? '0 8px 16px rgba(59, 130, 246, 0.25)' : '0 4px 12px rgba(0,0,0,0.03)',
                        transition: 'all 0.2s ease', transform: selectedClass === cls ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      Class {cls}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', textAlign: 'center', marginTop: '4px' }}>
                  {language === 'EN' ? '*You cannot change your class later' : '*ನಂತರ ನಿಮ್ಮ ತರಗತಿಯನ್ನು ಬದಲಾಯಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ'}
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            style={{
              marginTop: '16px', padding: '18px', borderRadius: '16px',
              background: (isLoading || !isFormValid()) ? '#94A3B8' : '#10B981',
              color: 'white', fontSize: '1.1rem', fontWeight: 800, border: 'none',
              cursor: (isLoading || !isFormValid()) ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: (isLoading || !isFormValid()) ? 'none' : '0 8px 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? (language === 'EN' ? 'Loading...' : 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...') : 
             (forgotPasswordMode 
              ? (language === 'EN' ? 'Send Reset Link' : 'ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಕಳುಹಿಸಿ') 
              : (isLoginMode ? (language === 'EN' ? 'Log In' : 'ಲಾಗಿನ್ ಮಾಡಿ') : (language === 'EN' ? 'Join Now' : 'ಈಗ ಸೇರಿಕೊಳ್ಳಿ')))} 
            {!isLoading && <ArrowRight size={20} />}
          </button>
          
        </form>
      </div>
      
    </div>
  );
};
