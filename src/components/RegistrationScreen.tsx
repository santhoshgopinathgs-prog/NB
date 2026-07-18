import React, { useState } from 'react';
import { BookOpen, User, GraduationCap, ArrowRight, Phone, School, KeyRound, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../utils/supabaseClient';

export const RegistrationScreen = () => {
  const { language, toggleLanguage } = useAppContext();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    // Supabase requires E.164 format for the actual API call (must start with +)
    // even though the dashboard settings strip it out.
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }

    if (!otpStep) {
      // Step 1: Send OTP
      const { error } = await supabase.auth.signInWithOtp({ 
        phone: formattedPhone 
      });
      
      if (error) {
        setErrorMsg(error.message);
      } else {
        setOtpStep(true);
      }
    } else {
      // Step 2: Verify OTP
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
        options: (!isLoginMode ? {
          data: {
            name: name.trim(),
            school: school.trim(),
            class_level: selectedClass
          }
        } : undefined) as any
      });

      if (error) {
        setErrorMsg(error.message);
      }
      // On success, AppContext's onAuthStateChange will pick it up automatically!
    }
    
    setIsLoading(false);
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
          <div style={{ background: 'var(--accent-blue)', padding: '8px', borderRadius: '12px' }}>
            <BookOpen color="white" size={24} />
          </div>
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
        {!otpStep && (
          <div style={{ display: 'flex', background: '#E2E8F0', borderRadius: '24px', padding: '4px', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => setIsLoginMode(false)}
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
              onClick={() => setIsLoginMode(true)}
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

        {otpStep && (
          <button 
            type="button"
            onClick={() => setOtpStep(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', marginBottom: '24px', fontWeight: 600 }}
          >
            <ChevronLeft size={20} /> {language === 'EN' ? 'Back' : 'ಹಿಂದೆ'}
          </button>
        )}

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1E293B', marginBottom: '12px', lineHeight: 1.2 }}>
            {isLoginMode 
              ? (otpStep ? (language === 'EN' ? 'Verify OTP' : 'OTP ಪರಿಶೀಲಿಸಿ') : (language === 'EN' ? 'Welcome back.' : 'ಮತ್ತೆ ಸ್ವಾಗತ.')) 
              : (language === 'EN' ? 'Start your learning journey today.' : 'ನಿಮ್ಮ ಕಲಿಕೆಯ ಪಯಣವನ್ನು ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ.')}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.5 }}>
            {isLoginMode 
              ? (otpStep ? (language === 'EN' ? `Enter the 4-digit code sent to ${phone}` : `${phone} ಗೆ ಕಳುಹಿಸಿದ 4-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ`) : (language === 'EN' ? 'Enter your phone number to restore your progress.' : 'ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಮರುಸ್ಥಾಪಿಸಲು ನಿಮ್ಮ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.'))
              : (language === 'EN' ? 'Create a profile to track your progress, earn XP, and collect certificates.' : 'ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು, XP ಗಳಿಸಲು ಮತ್ತು ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಸಂಗ್ರಹಿಸಲು ಪ್ರೊಫೈಲ್ ರಚಿಸಿ.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {errorMsg && (
            <div style={{ padding: '12px', background: '#FEE2E2', color: '#EF4444', borderRadius: '12px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}
          {(!isLoginMode) && (
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
                required={!isLoginMode}
              />
            </div>
          )}

          {(!otpStep) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={16} /> {language === 'EN' ? 'Phone Number' : 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ'}
              </label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={language === 'EN' ? 'Enter your phone number' : 'ನಿಮ್ಮ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ'}
                style={{ 
                  padding: '16px', borderRadius: '16px', border: '2px solid transparent', 
                  background: 'white', fontSize: '1rem', color: '#1E293B', outline: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'border 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
                required={!otpStep}
              />
            </div>
          )}

          {(!isLoginMode) && (
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
                  required={!isLoginMode}
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

          {otpStep && (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={16} /> OTP
              </label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                style={{ 
                  padding: '16px', borderRadius: '16px', border: '2px solid transparent', 
                  background: 'white', fontSize: '1.5rem', color: '#1E293B', outline: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'border 0.2s ease',
                  letterSpacing: '8px', textAlign: 'center', fontWeight: 800
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'transparent'}
                required={isLoginMode && otpStep}
              />
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', textAlign: 'center', marginTop: '4px' }}>
                  {language === 'EN' ? 'Enter the 6-digit OTP' : '6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ'}
              </div>
           </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || (otpStep ? otp.length < 6 : phone.trim().length < 10) || (!isLoginMode && (!name.trim() || !school.trim() || !selectedClass))}
            style={{
              marginTop: '16px', padding: '18px', borderRadius: '16px',
              background: (isLoading || (otpStep ? otp.length < 6 : phone.trim().length < 10) || (!isLoginMode && (!name.trim() || !school.trim() || !selectedClass))) ? '#94A3B8' : '#10B981',
              color: 'white', fontSize: '1.1rem', fontWeight: 800, border: 'none',
              cursor: (isLoading || (otpStep ? otp.length < 6 : phone.trim().length < 10) || (!isLoginMode && (!name.trim() || !school.trim() || !selectedClass))) ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: (isLoading || (otpStep ? otp.length < 6 : phone.trim().length < 10) || (!isLoginMode && (!name.trim() || !school.trim() || !selectedClass))) ? 'none' : '0 8px 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? (language === 'EN' ? 'Loading...' : 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...') : 
             (otpStep 
              ? (language === 'EN' ? 'Verify OTP' : 'OTP ಪರಿಶೀಲಿಸಿ') 
              : (isLoginMode ? (language === 'EN' ? 'Send OTP' : 'OTP ಕಳುಹಿಸಿ') : (language === 'EN' ? 'Join Now' : 'ಈಗ ಸೇರಿಕೊಳ್ಳಿ')))} 
            {!isLoading && <ArrowRight size={20} />}
          </button>
          
        </form>
      </div>
      
    </div>
  );
};
