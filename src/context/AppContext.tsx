import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, mockQuizzes } from '../data/mockData';
import { supabase } from '../utils/supabaseClient';

export interface Certificate {
  subject: string;
  classLevel: number;
}

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.EN) => string;
  user: { id: string; name: string; phone: string; school: string; class: number; streak: number; lastActive: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  completedQuizzes: string[];
  markQuizComplete: (id: string, xpGained: number) => Promise<boolean>;
  userXP: number;
  certificates: Certificate[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('EN');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; name: string; phone: string; school: string; class: number; streak: number; lastActive: string } | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [userXP, setUserXP] = useState<number>(0);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Fetch all user data when auth state changes
  const fetchUserData = async (userId: string) => {
    try {
      // 1. Fetch Profile
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
      
      // 2. Fetch Progress
      const { data: progress } = await supabase.from('user_progress').select('*').eq('user_id', userId).single();
      
      // 3. Fetch Completed Quizzes
      const { data: quizzes } = await supabase.from('completed_quizzes').select('quiz_id').eq('user_id', userId);
      
      // 4. Fetch Certificates
      const { data: certs } = await supabase.from('user_certificates').select('subject, class_level').eq('user_id', userId);

      if (profile && progress) {
        setUser({
          id: profile.id,
          name: profile.name,
          phone: profile.phone,
          school: profile.school,
          class: profile.class_level,
          streak: progress.streak,
          lastActive: progress.last_active
        });
        setUserXP(progress.total_xp);
      }
      
      if (quizzes) {
        setCompletedQuizzes(quizzes.map(q => q.quiz_id));
      }

      if (certs) {
        setCertificates(certs.map(c => ({ subject: c.subject, classLevel: c.class_level })));
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserXP(0);
        setCompletedQuizzes([]);
        setCertificates([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Returns true if a new certificate was just awarded
  const markQuizComplete = async (id: string, xpGained: number) => {
    let earnedCertificate = false;
    if (!user) return false;
    
    if (!completedQuizzes.includes(id)) {
      const newCompleted = [...completedQuizzes, id];
      setCompletedQuizzes(newCompleted);
      
      const newXp = userXP + xpGained;
      setUserXP(newXp);

      // Save to Supabase
      await supabase.from('completed_quizzes').insert({ user_id: user.id, quiz_id: id });
      await supabase.from('user_progress').update({ total_xp: newXp }).eq('user_id', user.id);

      // Check for certificate
      const quizData = mockQuizzes.find(q => q.id === id);
      if (quizData) {
        const subjectQuizzes = mockQuizzes.filter(q => q.subject === quizData.subject && q.class === quizData.class);
        const allSubjectCompleted = subjectQuizzes.every(sq => newCompleted.includes(sq.id));
        
        if (allSubjectCompleted) {
          if (!certificates.some(c => c.subject === quizData.subject && c.classLevel === quizData.class)) {
            const newCert = { subject: quizData.subject, classLevel: quizData.class };
            setCertificates(prev => [...prev, newCert]);
            earnedCertificate = true;
            
            // Save cert to Supabase
            await supabase.from('user_certificates').insert({
              user_id: user.id,
              subject: newCert.subject,
              class_level: newCert.classLevel
            });
          }
        }
      }
    }
    return earnedCertificate;
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'EN' ? 'KN' : 'EN'));
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const t = (key: keyof typeof translations.EN) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, toggleLanguage, t, user, isAuthenticated, isLoading, logout, completedQuizzes, markQuizComplete, userXP, certificates }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
