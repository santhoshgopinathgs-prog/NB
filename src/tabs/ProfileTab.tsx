import React from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Award, Download, CheckCircle2, LogOut } from 'lucide-react';
import { downloadCertificate } from '../utils/generateCertificate';

export const ProfileTab = () => {
  const { t, language, user, logout, userXP, certificates } = useAppContext();

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 20px' }}>
        <User color="var(--accent-blue)" />
        <h2 style={{ fontSize: '1.5rem' }}>{t('profile')}</h2>
      </div>

      <div className="card" style={{ padding: '24px', margin: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <User size={40} color="white" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem' }}>{user?.name}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
            <div style={{ color: 'var(--text-tertiary)' }}>{t('classText')}</div>
            <span style={{ padding: '4px 8px', borderRadius: '8px', background: 'var(--bg-app)', fontWeight: 600, color: 'var(--accent-blue)' }}>
              {user?.class}
            </span>
            <div style={{ color: 'var(--text-tertiary)' }}>• {language === 'EN' ? 'Karnataka Board' : 'ಕರ್ನಾಟಕ ಮಂಡಳಿ'}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '20px', width: '100%', marginTop: '10px' }}>
          <div style={{ flex: 1, textAlign: 'center', background: 'var(--bg-app)', padding: '12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{userXP}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{t('totalXp').replace(':', '')}</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center', background: 'var(--bg-app)', padding: '12px', borderRadius: '16px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-green)' }}>{certificates.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{t('certificates')}</div>
          </div>
        </div>
      </div>

      <div style={{ margin: '0 20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="var(--accent-purple)" /> {t('certificates')}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {certificates.length > 0 ? (
            certificates.map((cert, idx) => (
              <div key={idx} className="card animate-slide-up" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid var(--accent-green)' }}>
                <div>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {cert.subject} {language === 'EN' ? 'Scholar' : 'ವಿದ್ವಾಂಸ'} <CheckCircle2 size={16} color="var(--accent-green)"/>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                    {language === 'EN' 
                      ? `Completed all Class ${cert.classLevel} ${cert.subject} practice tests.`
                      : `ಎಲ್ಲಾ ತರಗತಿ ${cert.classLevel} ${cert.subject} ಅಭ್ಯಾಸ ಪರೀಕ್ಷೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ.`}
                  </div>
                </div>
                <button 
                  onClick={() => downloadCertificate(
                    user?.name || 'Student',
                    user?.school || 'Namma Buddy School',
                    cert.classLevel,
                    cert.subject
                  )}
                  style={{ padding: '8px', background: 'var(--bg-app)', borderRadius: '50%', color: 'var(--accent-blue)', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  title={language === 'EN' ? 'Download Certificate' : 'ಪ್ರಮಾಣಪತ್ರವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'}
                >
                  <Download size={18} />
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-tertiary)', background: 'var(--bg-surface)', borderRadius: '16px' }}>
              {language === 'EN' ? 'Complete all practice tests for a subject to earn a certificate!' : 'ಪ್ರಮಾಣಪತ್ರವನ್ನು ಗಳಿಸಲು ವಿಷಯಕ್ಕಾಗಿ ಎಲ್ಲಾ ಅಭ್ಯಾಸ ಪರೀಕ್ಷೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ!'}
            </div>
          )}

        </div>
      </div>

      <div style={{ margin: '20px 20px 40px', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={logout}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', 
            borderRadius: '16px', background: '#FEE2E2', color: '#DC2626', 
            border: 'none', fontWeight: 700, cursor: 'pointer' 
          }}
        >
          <LogOut size={18} />
          {language === 'EN' ? 'Log Out' : 'ಲಾಗ್ ಔಟ್'}
        </button>
      </div>
    </div>
  );
};
