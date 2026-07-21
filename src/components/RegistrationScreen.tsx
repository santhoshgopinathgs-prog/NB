import React, { useState } from 'react';
import { Mail, Lock, User, School, GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../utils/supabaseClient';

export const RegistrationScreen = () => {
  const { language, toggleLanguage, userRole, setUserRole } = useAppContext();
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'principal'>(userRole || 'student');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  
  const [securityCode, setSecurityCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Role-based Security Verification
    if (selectedRole === 'teacher') {
      const isTeacherValid = securityCode.trim().toUpperCase() === 'TEACHER2026' || email.toLowerCase().includes('teacher');
      if (!isTeacherValid) {
        setIsLoading(false);
        setErrorMsg(language === 'EN' ? '⚠️ Access Denied: Invalid Teacher Security Key. Students cannot access Teacher Portal.' : '⚠️ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ: ಅಮಾನ್ಯ ಶಿಕ್ಷಕರ ಭದ್ರತಾ ಕೀ.');
        return;
      }
    } else if (selectedRole === 'principal') {
      const isPrincipalValid = securityCode.trim().toUpperCase() === 'PRINCIPAL2026' || email.toLowerCase().includes('principal');
      if (!isPrincipalValid) {
        setIsLoading(false);
        setErrorMsg(language === 'EN' ? '⚠️ Access Denied: Invalid Executive Security Key. Students cannot access Principal Portal.' : '⚠️ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ: ಅಮಾನ್ಯ ಪ್ರಾಂಶುಪಾಲರ ಭದ್ರತಾ ಕೀ.');
        return;
      }
    }

    // Set authenticated user role in AppContext
    setUserRole(selectedRole);
    
    try {
      if (forgotPasswordMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setSuccessMsg(language === 'EN' ? 'Password reset link sent to your email.' : 'ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.');
      } else if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              name: name.trim(),
              school: school.trim(),
              class_level: selectedClass,
              role: selectedRole
            }
          }
        });
        if (error) throw error;
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

  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1.5px solid #E2E8F0',
    borderRadius: '14px',
    background: '#F8FAFC',
    fontSize: '0.95rem',
    color: '#0F172A',
    fontWeight: 600,
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const labelStyle = {
    fontSize: '0.78rem',
    fontWeight: 800,
    color: '#0F172A',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.8px',
    marginBottom: '6px',
    display: 'block'
  };

  const iconStyle = {
    position: 'absolute' as const,
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748B',
    width: '18px',
    height: '18px'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      background: '#F8FAFC',
      backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
      backgroundSize: '24px 24px',
      padding: '24px',
      position: 'relative'
    }}>
      
      {/* Language Toggle */}
      <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
        <button 
          onClick={toggleLanguage}
          style={{ 
            background: '#FFFFFF', 
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#0F172A',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(15,23,42,0.06)'
          }}
        >
          <span style={{ padding: '6px 14px', borderRadius: '18px', background: language === 'EN' ? '#2563EB' : 'transparent', color: language === 'EN' ? '#FFFFFF' : '#64748B', transition: 'all 0.2s ease' }}>EN</span>
          <span style={{ padding: '6px 14px', borderRadius: '18px', background: language === 'KN' ? '#2563EB' : 'transparent', color: language === 'KN' ? '#FFFFFF' : '#64748B', transition: 'all 0.2s ease' }}>KN</span>
        </button>
      </div>

      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '40px 32px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '76px', height: '76px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px', border: '3px solid #DBEAFE', padding: '4px', boxShadow: '0 8px 20px rgba(37,99,235,0.25)'
          }}>
            <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ 
            fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            Namma Buddy
          </h1>
          <p style={{ 
            fontSize: '0.78rem', color: '#64748B', margin: 0, 
            textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700
          }}>
            {language === 'EN' ? 'Digital Learning Platform • Karnataka' : 'ಡಿಜಿಟಲ್ ಕಲಿಕಾ ವೇದಿಕೆ • ಕರ್ನಾಟಕ'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#FEE2E2', color: '#EF4444', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#D1FAE5', color: '#10B981', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              <CheckCircle2 size={18} /> {successMsg}
            </div>
          )}

          {/* Role Selection Cards */}
          {!forgotPasswordMode && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>
                {language === 'EN' ? 'Portal Login Role' : 'ಲಾಗಿನ್ ಪಾತ್ರ'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'student', label: language === 'EN' ? 'Student' : 'ವಿದ್ಯಾರ್ಥಿ', icon: '🎓', color: '#10B981' },
                  { id: 'teacher', label: language === 'EN' ? 'Teacher' : 'ಶಿಕ್ಷಕ', icon: '👩‍🏫', color: '#2563EB' },
                  { id: 'principal', label: language === 'EN' ? 'Principal' : 'ಪ್ರಾಂಶುಪಾಲರು', icon: '🏛️', color: '#0F172A' }
                ].map(role => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role.id as any);
                    }}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '12px',
                      border: selectedRole === role.id ? `2.5px solid ${role.color}` : '1.5px solid #D1CFC7',
                      background: selectedRole === role.id ? `${role.color}15` : '#FFFFFF',
                      color: selectedRole === role.id ? role.color : '#64748B',
                      fontWeight: 900,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: selectedRole === role.id ? `0 4px 10px ${role.color}30` : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{role.icon}</span>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security Key for Teacher or Principal */}
          {selectedRole !== 'student' && !forgotPasswordMode && (
            <div style={{ position: 'relative', background: selectedRole === 'teacher' ? '#EFF6FF' : '#F8FAFC', padding: '12px 14px', borderRadius: '14px', border: `1.5px solid ${selectedRole === 'teacher' ? '#2563EB' : '#0F172A'}` }}>
              <label style={{ ...labelStyle, color: selectedRole === 'teacher' ? '#1E40AF' : '#0F172A', marginBottom: '4px' }}>
                {selectedRole === 'teacher' ? '🔒 Teacher Security Passcode' : '🔑 Executive Security Passcode'}
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input 
                  type="password" 
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  placeholder={selectedRole === 'teacher' ? 'Passcode: TEACHER2026' : 'Passcode: PRINCIPAL2026'}
                  style={{ ...inputStyle, borderBottomColor: selectedRole === 'teacher' ? '#2563EB' : '#0F172A', fontWeight: 800 }}
                  required
                />
              </div>
              <div style={{ fontSize: '0.72rem', color: selectedRole === 'teacher' ? '#1E40AF' : '#475569', marginTop: '6px', fontWeight: 700 }}>
                ℹ️ Passcode Required. Students attempting login will be denied access.
              </div>
            </div>
          )}

          {(!isLoginMode && !forgotPasswordMode) && (
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>{language === 'EN' ? 'Full Name' : 'ಪೂರ್ಣ ಹೆಸರು'}</label>
              <div style={{ position: 'relative' }}>
                <User style={iconStyle} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'EN' ? 'Enter your full name' : 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderBottomColor = '#1C2A3A'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#D1CFC7'}
                  required={!isLoginMode && !forgotPasswordMode}
                />
              </div>
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <label style={labelStyle}>{language === 'EN' ? 'Email' : 'ಇಮೇಲ್'}</label>
            <div style={{ position: 'relative' }}>
              <Mail style={iconStyle} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'EN' ? 'you@school.edu' : 'you@school.edu'}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderBottomColor = '#1C2A3A'}
                onBlur={(e) => e.target.style.borderBottomColor = '#D1CFC7'}
                required
              />
            </div>
          </div>

          {!forgotPasswordMode && (
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>{language === 'EN' ? 'Password' : 'ಪಾಸ್ವರ್ಡ್'}</label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'EN' ? 'Enter your password' : 'ನಿಮ್ಮ ಗುಪ್ತಪದವನ್ನು ನಮೂದಿಸಿ'}
                  style={{...inputStyle, paddingRight: '60px'}}
                  onFocus={(e) => e.target.style.borderBottomColor = '#1C2A3A'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#D1CFC7'}
                  required={!forgotPasswordMode}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#475569', fontSize: '0.75rem', 
                    fontWeight: 800, cursor: 'pointer', letterSpacing: '1px'
                  }}
                >
                  {showPassword ? (language === 'EN' ? 'HIDE' : 'ಮರೆಮಾಡಿ') : (language === 'EN' ? 'SHOW' : 'ತೋರಿಸು')}
                </button>
              </div>
            </div>
          )}

          {(!isLoginMode && !forgotPasswordMode) && (
            <>
              <div style={{ position: 'relative' }}>
                <label style={labelStyle}>{language === 'EN' ? 'School Name' : 'ಶಾಲೆಯ ಹೆಸರು'}</label>
                <div style={{ position: 'relative' }}>
                  <School style={iconStyle} />
                  <input 
                    type="text" 
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder={language === 'EN' ? 'Enter your school name' : 'ನಿಮ್ಮ ಶಾಲೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderBottomColor = '#1C2A3A'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#D1CFC7'}
                    required={!isLoginMode && !forgotPasswordMode}
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label style={labelStyle}>{language === 'EN' ? 'Class' : 'ತರಗತಿ'}</label>
                <div style={{ position: 'relative' }}>
                  <GraduationCap style={iconStyle} />
                  <select
                    value={selectedClass || ''}
                    onChange={(e) => setSelectedClass(Number(e.target.value))}
                    style={{...inputStyle, appearance: 'none', cursor: 'pointer'}}
                    onFocus={(e) => e.target.style.borderBottomColor = '#1C2A3A'}
                    onBlur={(e) => e.target.style.borderBottomColor = '#D1CFC7'}
                    required={!isLoginMode && !forgotPasswordMode}
                  >
                    <option value="" disabled hidden>
                      {language === 'EN' ? 'Select Class (8, 9, or 10)' : 'ತರಗತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ (8, 9, ಅಥವಾ 10)'}
                    </option>
                    {[8, 9, 10].map(cls => (
                      <option key={cls} value={cls} style={{ color: '#1E293B' }}>
                        {language === 'EN' ? `Class ${cls}` : `ತರಗತಿ ${cls}`}
                      </option>
                    ))}
                  </select>
                  <div style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B', fontSize: '0.7rem' }}>
                    ▼
                  </div>
                </div>
              </div>
            </>
          )}

          {isLoginMode && !forgotPasswordMode && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ 
                    width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer',
                    border: '1px solid #CBD5E1', borderRadius: '4px'
                  }}
                />
                {language === 'EN' ? 'Remember me' : 'ನನ್ನನ್ನು ನೆನಪಿನಲ್ಲಿಡು'}
              </label>
              
              <button 
                type="button"
                onClick={() => setForgotPasswordMode(true)}
                style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer' }}
              >
                {language === 'EN' ? 'Forgot password?' : 'ಪಾಸ್ವರ್ಡ್ ಮರೆತಿರಾ?'}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            style={{
              padding: '14px', borderRadius: '14px',
              background: (isLoading || !isFormValid()) ? '#CBD5E1' : '#2563EB',
              color: (isLoading || !isFormValid()) ? '#94A3B8' : '#FFFFFF',
              fontSize: '1rem', fontWeight: 900, border: 'none',
              cursor: (isLoading || !isFormValid()) ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: (isLoading || !isFormValid()) ? 'none' : '0 6px 18px rgba(37, 99, 235, 0.35)',
              transition: 'all 0.2s ease',
              marginTop: '8px'
            }}
          >
            {isLoading ? (language === 'EN' ? 'Processing...' : 'ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...') : 
             (forgotPasswordMode 
              ? (language === 'EN' ? 'Send Reset Link' : 'ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಕಳುಹಿಸಿ') 
              : (isLoginMode ? (language === 'EN' ? 'Sign in' : 'ಸೈನ್ ಇನ್ ಮಾಡಿ') : (language === 'EN' ? 'Create Account' : 'ಖಾತೆ ತೆರೆಯಿರಿ')))} 
          </button>
          
        </form>

        <div style={{ 
          display: 'flex', alignItems: 'center', margin: '28px 0 20px', 
          color: '#94A3B8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700
        }}>
          <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></div>
          <span style={{ padding: '0 16px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>
          {forgotPasswordMode ? (
            <button 
              type="button"
              onClick={() => { setForgotPasswordMode(false); setIsLoginMode(true); }}
              style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#2563EB', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}
            >
              {language === 'EN' ? 'Back to Sign in' : 'ಸೈನ್ ಇನ್‌ಗೆ ಹಿಂತಿರುಗಿ'}
            </button>
          ) : isLoginMode ? (
            <>
              {language === 'EN' ? 'New to Namma Buddy? ' : 'ನಮ್ಮ ಬಡ್ಡಿಗೆ ಹೊಸಬರೇ? '}
              <button 
                type="button"
                onClick={() => { setIsLoginMode(false); setErrorMsg(''); setSuccessMsg(''); }}
                style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#2563EB', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}
              >
                {language === 'EN' ? 'Create an account' : 'ಖಾತೆ ತೆರೆಯಿರಿ'}
              </button>
            </>
          ) : (
            <>
              {language === 'EN' ? 'Already have an account? ' : 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿರುವಿರಾ? '}
              <button 
                type="button"
                onClick={() => { setIsLoginMode(true); setErrorMsg(''); setSuccessMsg(''); }}
                style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#2563EB', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}
              >
                {language === 'EN' ? 'Sign in' : 'ಸೈನ್ ಇನ್ ಮಾಡಿ'}
              </button>
            </>
          )}
        </div>

      </div>
      
    </div>
  );
};
