import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './tabs/HomeTab';
import { LearnTab } from './tabs/LearnTab';
import { PracticeTab } from './tabs/PracticeTab';
import { TopTab } from './tabs/TopTab';
import { ProfileTab } from './tabs/ProfileTab';
import { AchievementsTab } from './tabs/AchievementsTab';
import { RegistrationScreen } from './components/RegistrationScreen';
import { AvatarSelectionScreen } from './components/AvatarSelectionScreen';
import { AITutorPortal } from './components/AITutorPortal';
import { useAppContext } from './context/AppContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAITutor, setShowAITutor] = useState(false);
  const [targetChapter, setTargetChapter] = useState<{ subjectId: string, subjectDisplay: string, chapter: string } | null>(null);

  const navigateToChapter = (subjectId: string, subjectDisplay: string, chapter: string) => {
    setTargetChapter({ subjectId, subjectDisplay, chapter });
    setActiveTab('learn');
  };
  const { isAuthenticated, isLoading, user } = useAppContext();

  React.useEffect(() => {
    // Always reset to home tab when auth state changes (login or logout)
    setActiveTab('home');
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-app)', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '1.2rem', flexDirection: 'column', gap: '16px' }}>
        <div className="animate-slide-up">Loading Namma Buddy...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <RegistrationScreen />;
  }

  if (isAuthenticated && user && !user.avatar) {
    return <AvatarSelectionScreen />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab navigateToChapter={navigateToChapter} />;
      case 'learn': return <LearnTab initialChapter={targetChapter} clearInitialChapter={() => setTargetChapter(null)} />;
      case 'practice': return <PracticeTab />;
      case 'top': return <TopTab />;
      case 'profile': return <ProfileTab />;
      case 'achievements': return <AchievementsTab setActiveTab={setActiveTab} />;
      default: return <HomeTab navigateToChapter={navigateToChapter} />;
    }
  };

  return (
    <>
      {activeTab !== 'achievements' && <Header setActiveTab={setActiveTab} />}
      <main className="page-container" style={{ padding: activeTab === 'achievements' ? 0 : undefined }}>
        {renderTab()}
      </main>
      {activeTab !== 'achievements' && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
      
      {/* Floating AI Buddy Button */}
      {isAuthenticated && (
        <button 
          onClick={() => setShowAITutor(true)}
          className="animate-bounce"
          style={{ 
            position: 'fixed', 
            bottom: '80px', 
            right: '20px', 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'var(--accent-blue)', 
            border: '3px solid white', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 900,
            overflow: 'hidden',
            padding: 0
          }}
        >
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Buddy&top=turban&skinColor=ae5d29&clothing=shirtCrewNeck&clothingColor=ffffff&topColor=81ecec&mouth=smile" alt="AI Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      )}

      {showAITutor && <AITutorPortal onClose={() => setShowAITutor(false)} />}
    </>
  );
}

export default AppContent;
