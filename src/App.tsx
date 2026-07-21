import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { RightSidebar } from './components/RightSidebar';
import { HomeTab } from './tabs/HomeTab';
import { LearnTab } from './tabs/LearnTab';
import { PracticeTab } from './tabs/PracticeTab';
import { TopTab } from './tabs/TopTab';
import { ProfileTab } from './tabs/ProfileTab';
import { AchievementsTab } from './tabs/AchievementsTab';
import { TeacherDashboard } from './components/TeacherDashboard';
import { PrincipalDashboard } from './components/PrincipalDashboard';
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
  const { isAuthenticated, isLoading, user, userRole } = useAppContext();

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

  if (isAuthenticated && user && !user.avatar && userRole === 'student') {
    return <AvatarSelectionScreen />;
  }

  const renderTabContent = () => {
    if (userRole === 'teacher') {
      return <TeacherDashboard />;
    }
    if (userRole === 'principal') {
      return <PrincipalDashboard />;
    }

    switch (activeTab) {
      case 'home': return <HomeTab navigateToChapter={navigateToChapter} setActiveTab={setActiveTab} />;
      case 'learn': return <LearnTab initialChapter={targetChapter} clearInitialChapter={() => setTargetChapter(null)} />;
      case 'practice': return <PracticeTab />;
      case 'top': return <TopTab />;
      case 'profile': return <ProfileTab />;
      case 'achievements': return <AchievementsTab setActiveTab={setActiveTab} />;
      default: return <HomeTab navigateToChapter={navigateToChapter} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      <div className="desktop-layout-wrapper">
        <div className="main-content-area" style={{ width: '100%' }}>
          {activeTab !== 'achievements' && <Header setActiveTab={setActiveTab} />}
          <main className="page-container" style={{ padding: activeTab === 'achievements' ? 0 : undefined }}>
            {renderTabContent()}
          </main>
        </div>

        {/* Right Sidebar for Desktop Web Users (Student Mode) */}
        {activeTab !== 'achievements' && userRole === 'student' && (
          <div className="right-sidebar-container">
            <RightSidebar setActiveTab={setActiveTab} />
          </div>
        )}
      </div>

      {/* Bottom Navigation Fixed at Bottom across Mobile, Tablet, and Desktop for Student Mode */}
      {activeTab !== 'achievements' && userRole === 'student' && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}

      {/* Floating AI Buddy Button */}
      {isAuthenticated && (
        <button 
          onClick={() => setShowAITutor(true)}
          className="floating-bot-btn animate-bounce"
        >
          <img src="/bot_icon.jpg" alt="AI Buddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      )}

      {showAITutor && <AITutorPortal onClose={() => setShowAITutor(false)} />}
    </div>
  );
}

export default AppContent;
