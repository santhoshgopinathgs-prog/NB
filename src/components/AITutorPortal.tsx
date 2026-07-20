import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, Loader2, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const AITutorPortal = ({ onClose, initialQuery }: { onClose: () => void, initialQuery?: string }) => {
  const { language, user } = useAppContext();
  
  // Use environment variable for the API key (configured in Vercel/Netlify for production)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const userMsg = input.trim();
    if (!userMsg) return;
    
    const newMsgs = [...messages, { text: userMsg, isBot: false }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);
    
    if (!apiKey) {
      setTimeout(() => {
        setMessages([...newMsgs, { 
          text: language === 'EN' 
            ? "The AI Tutor is currently offline. Please contact the administrator to configure the AI service." 
            : "AI ಟ್ಯೂಟರ್ ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದೆ. AI ಸೇವೆಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಲು ದಯವಿಟ್ಟು ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
          isBot: true 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const history = messages.slice(1).map(m => ({
        role: m.isBot ? "model" : "user",
        parts: [{ text: m.text }]
      }));

      const chat = model.startChat({
        history,
        systemInstruction: language === 'EN' 
          ? "You are a helpful, encouraging AI tutor for high school students in Karnataka, India. Explain concepts simply and clearly. If asked about the syllabus, refer to standard high school topics." 
          : "ನೀವು ಕರ್ನಾಟಕದ ಪ್ರೌಢಶಾಲಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಹಾಯಕವಾದ, ಪ್ರೋತ್ಸಾಹದಾಯಕ AI ಶಿಕ್ಷಕರಾಗಿದ್ದೀರಿ. ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಸರಳವಾಗಿ ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಿ. ಕನ್ನಡದಲ್ಲಿಯೇ ಉತ್ತರಿಸಿ."
      });

      const result = await chat.sendMessage(userMsg);
      const responseText = result.response.text();

      setMessages([...newMsgs, { text: responseText, isBot: true }]);
    } catch (err: any) {
      console.error(err);
      setMessages([...newMsgs, { 
        text: (language === 'EN' ? "Error: " : "ದೋಷ: ") + (err.message || 'Failed to connect to AI.'), 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-app)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: 10 }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', fontSize: '1.5rem' }}>
          ←
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-green)' }}>
              <img src="/bot_icon.jpg" alt="Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            Namma Buddy
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Online • Kannada, English</div>
        </div>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '85%', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            {msg.isBot && (
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/bot_icon.jpg" alt="Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ 
              background: msg.isBot ? 'white' : 'var(--accent-blue)', 
              color: msg.isBot ? 'var(--text-primary)' : 'white', 
              padding: '16px', 
              borderRadius: msg.isBot ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              lineHeight: 1.6,
              fontSize: '0.95rem'
            }}>
              {msg.text}
            </div>
            {!msg.isBot && (
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={16} color="white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', background: 'white', padding: '16px', borderRadius: '20px 20px 20px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Loader2 className="animate-spin" size={20} color="var(--accent-blue)" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '20px', background: 'white', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          placeholder={language === 'EN' ? "Ask me anything..." : "ಏನಾದರೂ ಕೇಳಿ..."}
          style={{ flex: 1, padding: '16px', borderRadius: '24px', border: '1px solid var(--border-light)', background: 'var(--bg-app)', outline: 'none', fontSize: '1rem' }}
        />
        <button disabled={isLoading || !input.trim()} onClick={handleSend} style={{ width: '50px', height: '50px', borderRadius: '50%', background: (isLoading || !input.trim()) ? 'var(--border-light)' : 'var(--accent-blue)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: 'white', transition: 'background 0.2s' }}>
          ➤
        </button>
      </div>
    </div>,
    document.body
  );
};
