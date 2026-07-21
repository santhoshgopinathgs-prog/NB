import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, mockQuizzes } from '../data/mockData';
import { supabase } from '../utils/supabaseClient';

export interface Certificate {
  subject: string;
  classLevel: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  avatar: string;
}

export interface DailyQuests {
  date: string;
  lessons: number;
  lessonsClaimed: boolean;
  quiz80: boolean;
  quiz80Claimed: boolean;
  aiTutor: boolean;
  aiTutorClaimed: boolean;
  typing: boolean;
  typingClaimed: boolean;
}

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.EN) => string;
  userRole: 'student' | 'teacher' | 'principal';
  setUserRole: (role: 'student' | 'teacher' | 'principal') => void;
  user: { id: string; name: string; email: string; school: string; class: number; streak: number; lastActive: string; avatar?: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  completedQuizzes: string[];
  markQuizComplete: (id: string, xpGained: number) => Promise<boolean>;
  userXP: number;
  certificates: Certificate[];
  leaderboard: LeaderboardUser[];
  fetchLeaderboard: () => Promise<void>;
  updateUserAvatar: (avatarUrl: string) => Promise<void>;
  dailyQuests: DailyQuests;
  incrementLessonsCompleted: () => void;
  markQuiz80Percent: () => void;
  markAITutorUsed: () => void;
  markTypingPracticed: () => void;
  claimQuestXP: (questId: 'lessons' | 'quiz80' | 'aiTutor' | 'typing', xpReward: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('EN');
  const [userRole, setUserRoleState] = useState<'student' | 'teacher' | 'principal'>(() => {
    const saved = localStorage.getItem('nb_user_role');
    return (saved === 'teacher' || saved === 'principal' || saved === 'student') ? saved : 'student';
  });

  const setUserRole = (role: 'student' | 'teacher' | 'principal') => {
    setUserRoleState(role);
    localStorage.setItem('nb_user_role', role);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; name: string; email: string; school: string; class: number; streak: number; lastActive: string; avatar?: string } | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [userXP, setUserXP] = useState<number>(0);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  // Daily Quests State
  const [dailyQuests, setDailyQuests] = useState<DailyQuests>(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('nb_daily_quests');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) return parsed;
    }
    return {
      date: today,
      lessons: 0,
      lessonsClaimed: false,
      quiz80: false,
      quiz80Claimed: false,
      aiTutor: false,
      aiTutorClaimed: false,
      typing: false,
      typingClaimed: false
    };
  });

  useEffect(() => {
    localStorage.setItem('nb_daily_quests', JSON.stringify(dailyQuests));
  }, [dailyQuests]);

  const incrementLessonsCompleted = () => {
    setDailyQuests(prev => ({ ...prev, lessons: Math.min(2, prev.lessons + 1) }));
  };

  const markQuiz80Percent = () => {
    setDailyQuests(prev => ({ ...prev, quiz80: true }));
  };

  const markAITutorUsed = () => {
    setDailyQuests(prev => ({ ...prev, aiTutor: true }));
  };

  const markTypingPracticed = () => {
    setDailyQuests(prev => ({ ...prev, typing: true }));
  };

  const claimQuestXP = (questId: 'lessons' | 'quiz80' | 'aiTutor' | 'typing', xpReward: number) => {
    setDailyQuests(prev => ({ ...prev, [`${questId}Claimed`]: true }));
    setUserXP(prevXp => {
      const nextXp = prevXp + xpReward;
      if (user) {
        supabase.from('user_progress').update({ total_xp: nextXp }).eq('user_id', user.id);
      }
      return nextXp;
    });
  };

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          total_xp,
          user_id,
          profiles ( name, email )
        `)
        .order('total_xp', { ascending: false })
        .limit(10);
      
      if (data && !error) {
        const formattedLeaderboard = data.map(item => {
          const profile = item.profiles as any; 
          const name = profile?.name || profile?.email?.split('@')[0] || 'User';
          return {
            name: name,
            xp: item.total_xp,
            id: item.user_id,
            avatar: name.charAt(0).toUpperCase()
          };
        });
        setLeaderboard(formattedLeaderboard);
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  // Fetch all user data when auth state changes
  const fetchUserData = async (authUser: any) => {
    try {
      const userId = authUser.id;
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
          email: profile.email,
          school: profile.school,
          class: profile.class_level,
          streak: progress.streak,
          lastActive: progress.last_active,
          avatar: authUser.user_metadata?.avatar
        });
        setUserXP(progress.total_xp);
      }
      
      if (quizzes) {
        setCompletedQuizzes(quizzes.map(q => q.quiz_id));
      }

      if (certs) {
        setCertificates(certs.map(c => ({ subject: c.subject, classLevel: c.class_level })));
      }
      
      await fetchLeaderboard();
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
        fetchUserData(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserData(session.user);
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

  const updateUserAvatar = async (avatarUrl: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { avatar: avatarUrl }
      });
      if (error) throw error;
      if (user) {
        setUser({ ...user, avatar: avatarUrl });
      }
    } catch (err) {
      console.error('Error updating avatar:', err);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const t = (key: keyof typeof translations.EN) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, toggleLanguage, t, userRole, setUserRole, user, isAuthenticated, isLoading, logout, completedQuizzes, markQuizComplete, userXP, certificates, leaderboard, fetchLeaderboard, updateUserAvatar,
      dailyQuests,
      incrementLessonsCompleted,
      markQuiz80Percent,
      markAITutorUsed,
      markTypingPracticed,
      claimQuestXP
    }}>
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
