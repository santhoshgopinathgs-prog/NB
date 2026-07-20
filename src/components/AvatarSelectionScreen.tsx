import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Check } from 'lucide-react';

export const AvatarSelectionScreen = ({ onClose }: { onClose?: () => void }) => {
  const { updateUserAvatar, language } = useAppContext();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // High quality Anime Avatars
  const boyAvatar = '/buddy_boy.jpg';
  const girlAvatar = '/buddy_girl.jpg';

  const handleConfirm = async () => {
    if (!selectedAvatar) return;
    setIsSaving(true);
    await updateUserAvatar(selectedAvatar);
    setIsSaving(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'var(--font-main)',
      position: onClose ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: onClose ? 2000 : 1
    }}>
      <div className="card animate-slide-up" style={{ 
        background: 'var(--bg-surface)', 
        padding: '32px 24px',
        maxWidth: '500px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        border: '1px solid var(--border-light)',
        position: 'relative'
      }}>
        
        {onClose && (
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            ✕
          </button>
        )}

        <h2 style={{ fontSize: '1.8rem', fontFamily: 'Georgia, "Times New Roman", Times, serif', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {language === 'EN' ? 'Choose Your Avatar' : 'ನಿಮ್ಮ ಅವತಾರವನ್ನು ಆರಿಸಿ'}
        </h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '32px' }}>
          {language === 'EN' ? 'How would you like to appear on Namma Buddy?' : 'ನಮ್ಮ ಬಡ್ಡಿಯಲ್ಲಿ ನೀವು ಹೇಗೆ ಕಾಣಿಸಿಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ?'}
        </p>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '32px' }}>
          {/* Boy Avatar */}
          <button 
            onClick={() => setSelectedAvatar(boyAvatar)}
            style={{ 
              position: 'relative',
              background: 'transparent',
              border: `4px solid ${selectedAvatar === boyAvatar ? 'var(--accent-blue)' : '#e2e8f0'}`,
              borderRadius: '50%',
              padding: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: selectedAvatar === boyAvatar ? 'scale(1.08)' : 'scale(1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: selectedAvatar === boyAvatar ? '0 8px 20px rgba(59, 130, 246, 0.3)' : 'none'
            }}
          >
            <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #38bdf8' }}>
              <img src={boyAvatar} alt="Boy Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem', marginTop: '12px' }}>
              {language === 'EN' ? 'Boy' : 'ಹುಡುಗ'}
            </div>
            {selectedAvatar === boyAvatar && (
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-blue)', borderRadius: '50%', padding: '6px', display: 'flex', border: '2px solid white' }}>
                <Check size={18} color="white" />
              </div>
            )}
          </button>

          {/* Girl Avatar */}
          <button 
            onClick={() => setSelectedAvatar(girlAvatar)}
            style={{ 
              position: 'relative',
              background: 'transparent',
              border: `4px solid ${selectedAvatar === girlAvatar ? '#ec4899' : '#e2e8f0'}`,
              borderRadius: '50%',
              padding: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: selectedAvatar === girlAvatar ? 'scale(1.08)' : 'scale(1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: selectedAvatar === girlAvatar ? '0 8px 20px rgba(236, 72, 153, 0.3)' : 'none'
            }}
          >
            <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f472b6' }}>
              <img src={girlAvatar} alt="Girl Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem', marginTop: '12px' }}>
              {language === 'EN' ? 'Girl' : 'ಹುಡುಗಿ'}
            </div>
            {selectedAvatar === girlAvatar && (
              <div style={{ position: 'absolute', top: 0, right: 0, background: '#ec4899', borderRadius: '50%', padding: '6px', display: 'flex', border: '2px solid white' }}>
                <Check size={18} color="white" />
              </div>
            )}
          </button>
        </div>

        <button 
          onClick={handleConfirm}
          disabled={!selectedAvatar || isSaving}
          style={{ 
            width: '100%', 
            padding: '16px', 
            background: selectedAvatar ? 'var(--accent-blue)' : '#94A3B8', 
            color: 'white', 
            fontWeight: 800, 
            borderRadius: '20px', 
            fontSize: '1rem',
            border: 'none',
            cursor: selectedAvatar ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
            opacity: isSaving ? 0.7 : 1
          }}
        >
          {isSaving ? 'Saving...' : (language === 'EN' ? 'Save Avatar' : 'ಅವತಾರವನ್ನು ಉಳಿಸಿ')}
        </button>

      </div>
    </div>
  );
};
