import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Key, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const AITutorPortal = ({ onClose, initialQuery }: { onClose: () => void, initialQuery?: string }) => {
  const { language } = useAppContext();
  
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '');
  const [showSettings, setShowSettings] = useState(!apiKey);
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

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowSettings(false);
  };

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
            ? "Please enter your Gemini API Key in the settings to activate me!" 
            : "ನನ್ನನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ Gemini API ಕೀಲಿಯನ್ನು ನಮೂದಿಸಿ!",
          isBot: true 
        }]);
        setIsLoading(false);
        setShowSettings(true);
      }, 500);
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

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-app)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: 10 }}>
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
        <button onClick={() => setShowSettings(!showSettings)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <Key size={20} />
        </button>
      </div>

      {showSettings && (
        <div style={{ padding: '16px 20px', background: '#F8FAFC', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="password" 
            placeholder="Enter Gemini API Key..."
            defaultValue={apiKey}
            onBlur={(e) => saveApiKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveApiKey(e.currentTarget.value)}
            style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-light)', outline: 'none' }}
          />
          <button onClick={() => setShowSettings(false)} style={{ padding: '12px 20px', background: 'var(--accent-blue)', color: 'white', borderRadius: '12px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            Save
          </button>
        </div>
      )}

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
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
    </div>
  );
};
