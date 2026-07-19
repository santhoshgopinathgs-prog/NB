import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const AITutorPortal = ({ onClose, initialQuery }: { onClose: () => void, initialQuery?: string }) => {
  const { language } = useAppContext();
  
  const getInitialMessage = () => {
    if (initialQuery) {
      return language === 'EN' 
        ? `Hi! I see you want to learn about "${initialQuery}". What specific questions do you have?` 
        : `ನಮಸ್ಕಾರ! ನೀವು "${initialQuery}" ಬಗ್ಗೆ ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ನಾನು ನೋಡುತ್ತಿದ್ದೇನೆ. ನಿಮಗೆ ಯಾವ ನಿರ್ದಿಷ್ಟ ಪ್ರಶ್ನೆಗಳಿವೆ?`;
    }
    return language === 'EN' 
      ? "Hi there! I'm your AI Tutor. What would you like to learn today?" 
      : "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಶಿಕ್ಷಕ. ಇಂದು ನೀವು ಏನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?";
  };

  const [messages, setMessages] = useState([
    { text: getInitialMessage(), isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMsgs = [...messages, { text: input, isBot: false }];
    setMessages(newMsgs);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMsgs, { 
        text: language === 'EN' 
          ? "That's a great question! However, this is just a demo interface. Soon I'll be connected to a powerful AI model to help you master any subject!" 
          : "ಅದು ಉತ್ತಮ ಪ್ರಶ್ನೆ! ಆದರೆ, ಇದು ಕೇವಲ ಡೆಮೊ ಇಂಟರ್ಫೇಸ್ ಆಗಿದೆ. ಶೀಘ್ರದಲ್ಲೇ ನಾನು ನಿಮಗೆ ಯಾವುದೇ ವಿಷಯವನ್ನು ಕರಗತ ಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಲು ಶಕ್ತಿಯುತ AI ಮಾದರಿಗೆ ಸಂಪರ್ಕಗೊಳ್ಳುತ್ತೇನೆ!",
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-app)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', fontSize: '1.5rem' }}>
          ←
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} color="var(--accent-orange)" />
            AI Tutor
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Online • Kannada, English</div>
        </div>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
            <div style={{ 
              background: msg.isBot ? 'white' : 'var(--accent-blue)', 
              color: msg.isBot ? 'var(--text-primary)' : 'white', 
              padding: '16px', 
              borderRadius: msg.isBot ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              lineHeight: 1.5
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', background: 'white', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={language === 'EN' ? "Ask me anything..." : "ಏನಾದರೂ ಕೇಳಿ..."}
          style={{ flex: 1, padding: '16px', borderRadius: '24px', border: '1px solid var(--border-light)', background: 'var(--bg-app)', outline: 'none', fontSize: '1rem' }}
        />
        <button onClick={handleSend} style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-blue)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: 'white' }}>
          ➤
        </button>
      </div>
    </div>
  );
};
